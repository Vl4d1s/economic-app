const fs = require('fs');
const workers = require('./tabels/workers.json');
const lifeTable = require('./tabels/lifeTable.json');
const leavingProbabilityTable = require('./tabels/leavingProb.json');
const interestRateTable = require('./tabels/interestRate.json');
const assets = require('./tabels/assets.json');
const compensation = require('./tabels/compensation.json');

const salaryGrowthRate = 0.02;
const retireAge = { F: 64, M: 67 };
const x = '2020-12-31';

function diffYearMonthDay(dt1, dt2) {
  const d1 = new Date(dt1.split('-').join(',')).getTime();
  const d2 = new Date(dt2.split('-').join(',')).getTime();

  const time = (d2 - d1) / 1000;
  const year = Math.abs(time / (60 * 60 * 24) / 365.25);
  const month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
  const days = Math.abs(Math.round(time / (3600 * 24)));
  return { days, month, year };
}

function parseFloatWorkerValues(obj, valuesToParse) {
  if (obj) {
    Object.keys(obj).map(function (key) {
      obj[key] = valuesToParse.includes(key) && typeof obj[key] === 'string' ? parseFloat(obj[key]) : obj[key];
    });
  }
}

function compensationCalculate(workers) {
  const valuesToParse = ['lastSalary', 'propValue', 'deposits', 'payProp', 'compCheck', 'art14Percent'];
  if (workers.length > 1) {
    const compensationArray = [];
    workers.map(worker => {
      parseFloatWorkerValues(worker, valuesToParse);
      const compensation = calculate(worker);
      const temp = { id: worker.id, value: compensation };
      compensationArray.push(temp);
    });
    return compensationArray;
  } else if (workers.length === 1) {
    parseFloatWorkerValues(workers[0], valuesToParse);
    const compensation = calculate(workers[0]);
    return [{ id: workers[0].id, value: compensation }];
  }
}

function calculate(worker) {
  const { sex, birthDate, startJobDate, lastSalary, art14StartingDate, propValue, art14Percent, leavingDate } = worker;
  const age = Math.floor(diffYearMonthDay(x, birthDate).year);
  const startJobAge = Math.floor(diffYearMonthDay(startJobDate, birthDate).year);
  const w = retireAge[sex];
  const seniority = diffYearMonthDay(x, startJobDate).year;
  const totalWithoutArt14Time =
    art14StartingDate !== '' ? Math.round(diffYearMonthDay(art14StartingDate, startJobDate).year) : 0;
  const firstCalculation = lastSalary * seniority * (1 - art14Percent);

  const compensationReason = {
    DISMISSAL: 'dismissal',
    RESINGNATION: 'resignation',
    DIE: 'die',
    RETIER: 'retiere',
  };

  function sumOfDismissalResignationAndDie(val, numOfIterations = w - age - 2) {
    let Px = 0;
    let sum = 0;
    let Qx = 0;

    for (let t = 0; t <= numOfIterations; t++) {
      const art14PercentCopy = totalWithoutArt14Time < t ? art14Percent : 0;

      const firstCalculation = lastSalary * seniority * (1 - art14PercentCopy);

      const currentProbabilityInfo = leavingProbabilityTable[age + t + 1];
      parseFloatWorkerValues(currentProbabilityInfo, ['dismissalProbability', 'resignationProbability']);

      const { dismissalProbability, resignationProbability } = currentProbabilityInfo;
      const dieProbability = parseFloat(lifeTable[sex][age + t + 1]['q(x)']);
      const DiscountRate = parseFloat(interestRateTable[t + 1].discountRate);
      const power = t + 0.5;

      if (val === compensationReason.DISMISSAL) Qx = dismissalProbability;
      else if (val === compensationReason.RESINGNATION) Qx = resignationProbability;
      else if (val === compensationReason.DIE) Qx = dieProbability;

      Px = t === 0 ? 1 : Px * (1 - dismissalProbability - resignationProbability - dieProbability);
      const numerator = Math.pow(1 + salaryGrowthRate, power) * Px * Qx;
      const denominator = Math.pow(1 + DiscountRate, power);

      sum =
        val === compensationReason.RESINGNATION
          ? (sum += propValue * Px * Qx)
          : (sum += firstCalculation * (numerator / denominator));
    }

    if (val === compensationReason.RETIER) {
      const Qx1 = parseFloat(leavingProbabilityTable[w - 1].dismissalProbability);
      const Qx3 = parseFloat(lifeTable[sex][w - 1]['q(x)']);
      const Qx2 = parseFloat(leavingProbabilityTable[w - 1].resignationProbability);

      const DiscountRate = parseFloat(interestRateTable[w - startJobAge].discountRate);

      const retCalcPart1 =
        (firstCalculation * (Math.pow(1 + salaryGrowthRate, w - age + 0.5) * Px * Qx1)) /
        Math.pow(1 + DiscountRate, w - age + 0.5);

      const retCalcPart2 =
        (firstCalculation * (Math.pow(1 + salaryGrowthRate, w - age - 0.5) * Px * Qx3)) /
        Math.pow(1 + DiscountRate, w - age - 0.5);

      const retCalcPart3 = propValue * Px * Qx2;

      const retCalcPart4 =
        (firstCalculation * (Math.pow(1 + salaryGrowthRate, w - age) * Px * (1 - Qx1 - Qx2 - Qx3))) /
        Math.pow(1 + DiscountRate, w - age);

      sum = retCalcPart1 + retCalcPart2 + retCalcPart3 + retCalcPart4;
    }
    return sum;
  }

  const dismissalSum = sumOfDismissalResignationAndDie(compensationReason.DISMISSAL);
  const dieSum = sumOfDismissalResignationAndDie(compensationReason.DIE);
  const resignationSum = sumOfDismissalResignationAndDie(compensationReason.RESINGNATION);
  const retiereSum = sumOfDismissalResignationAndDie(compensationReason.RETIER, w - age - 1);
  let finalSum = dismissalSum + dieSum + resignationSum + retiereSum;

  finalSum = seniority < 2 ? dismissalSum + dieSum + retiereSum : finalSum;
  finalSum = seniority > 2 && propValue > finalSum ? propValue : finalSum;
  finalSum = !leavingDate ? finalSum : 0;
  finalSum = age > retireAge[sex] ? seniority * lastSalary : finalSum;

  return finalSum;
}

const calcActuaryFactor = workers => {
  const actuaryFactorArray = [];
  const compensationArray = compensationCalculate(workers);

  for (let i = 0; i < compensationArray.length; i++) {
    const { id, lastSalary, startJobDate, art14Percent } = workers[i];
    const seniority = diffYearMonthDay(x, startJobDate).year;
    let actuaryFactor = 0;

    const compensationValue = compensationArray[i].value;
    const numerator = compensationValue;
    const denominator = lastSalary * seniority * (1 - art14Percent);

    if (numerator && denominator) actuaryFactor = numerator / denominator;

    actuaryFactorArray.push({ id, value: actuaryFactor });
  }
  return actuaryFactorArray;
};

const calcNo1 = workers => {
  const currentServiceCostArray = [];
  const actuaryFactorArray = calcActuaryFactor(workers);

  for (let i = 0; i < actuaryFactorArray.length; i++) {
    const { id, lastSalary, art14Percent, leavingDate } = workers[i];
    const actuaryFactor = !leavingDate ? actuaryFactorArray[i].value : 1;
    const isWorking = leavingDate ? 0 : 1;
    const currentServiceCost = actuaryFactor * (1 - art14Percent) * lastSalary * isWorking;

    currentServiceCostArray.push({ id, value: currentServiceCost });
  }

  return currentServiceCostArray;
};

const serviceExpectancyCalculation = worker => {
  const { sex, birthDate } = worker;
  const age = Math.floor(diffYearMonthDay(x, birthDate).year);
  const w = retireAge[sex];
  let sumPx = 0;
  let Px = 0;

  for (let t = 0; t <= w - age - 1; t++) {
    const currentProbabilityInfo = leavingProbabilityTable[age + t + 1];
    parseFloatWorkerValues(currentProbabilityInfo, ['dismissalProbability', 'resignationProbability']);

    const { dismissalProbability, resignationProbability } = currentProbabilityInfo;
    const dieProbability = parseFloat(lifeTable[sex][age + t + 1]['q(x)']);

    Px = t === 0 ? 1 : Px * (1 - dismissalProbability - resignationProbability - dieProbability);
    sumPx += Px;
  }
  return w - age - 1 < 0 ? 1 : Math.round(sumPx); // serviceExpectancy 0, id:49 gets sumPx of zero if Px = 0
};

const interestRateCalculation = workers => {
  const interestRateArray = [];
  for (let i = 0; i < workers.length; i++) {
    const { id } = workers[i];
    const serviceExpectancy = serviceExpectancyCalculation(workers[i]);
    parseFloatWorkerValues(interestRateTable[serviceExpectancy], ['discountRate']);
    const discountRate = interestRateTable[serviceExpectancy].discountRate;
    interestRateArray.push({ id, value: discountRate });
  }
  return interestRateArray;
};

const calcNo2 = workers => {
  const interestCostArray = [];
  const currentServiceCostArray = calcNo1(workers);
  const interestRateArray = interestRateCalculation(workers);

  for (let i = 0; i < workers.length; i++) {
    const { payProp, id, compCheck } = workers[i];
    const currentServiceCost = currentServiceCostArray[i].value;
    const compensationValue = parseFloat(compensation[i].value);
    const interestRate = interestRateArray[i].value;
    // { id: '3', value: -852.6099999999997, firstName: '????????' },
    const interestCost =
      compensationValue * interestRate +
      (currentServiceCost - parseFloat(payProp) - parseFloat(compCheck)) * (interestRate / 2);
    interestCostArray.push({ id, value: interestCost });
  }

  return interestCostArray;
};

const calcNo3 = workers => {
  const ActuarialProfitLossArray = [];
  const compensationArray = compensationCalculate(workers);
  const currentServiceCostArray = calcNo1(workers);
  const interestRateArray = interestRateCalculation(workers);

  for (let i = 0; i < workers.length; i++) {
    const { id, payProp, compCheck } = workers[i];
    const compensationTable = parseFloat(compensation[i].value);
    const currentServiceCost = currentServiceCostArray[i].value;
    const compensationValue = compensationArray[i].value;
    const interestRate = interestRateArray[i].value;

    const ActuarialProfitLoss =
      parseFloat(compensationValue) -
      compensationTable -
      currentServiceCost -
      parseFloat(interestRate) +
      parseFloat(payProp) +
      parseFloat(compCheck);
    ActuarialProfitLossArray.push({ id, value: ActuarialProfitLoss });
  }

  return ActuarialProfitLossArray;
};

const calcNo4 = workers => {
  const yieldProgramAssetsArray = [];
  const interestRateArray = interestRateCalculation(workers);

  for (let i = 0; i < workers.length; i++) {
    const { id, deposits, leavingDate } = workers[i];
    const oppeningAsset = parseFloat(assets[i].value);
    const interestRate = parseFloat(interestRateArray[i].value);
    const isLeaving = !leavingDate ? 0 : parseFloat(deposits);

    const yieldProgramAssets = oppeningAsset * interestRate + (parseFloat(deposits) - isLeaving) * (interestRate / 2);
    yieldProgramAssetsArray.push({ id, value: yieldProgramAssets });
  }

  return yieldProgramAssetsArray;
};

const calcNo5 = workers => {
  const fairValueAssetsArray = [];
  const yieldProgramAssetsArray = calcNo4(workers);

  for (let i = 0; i < workers.length; i++) {
    const { id, propValue, lastSalary, leavingDate, payProp } = workers[i];
    const workerYieldProgramAssets = yieldProgramAssetsArray[i].value;
    const oppeningAsset = parseFloat(assets[i].value);
    const propertyValue = !leavingDate ? 0 : parseFloat(propValue);

    const fairValueAssets =
      propertyValue - oppeningAsset - workerYieldProgramAssets - parseFloat(lastSalary) + parseFloat(payProp);

    fairValueAssetsArray.push({ id, value: fairValueAssets });
  }

  return fairValueAssetsArray;
};

const allData = workers => {
  const calcNo1Array = calcNo1(workers);
  const calcNo2Array = calcNo2(workers);
  const calcNo3Array = calcNo3(workers);
  const calcNo4Array = calcNo4(workers);
  const calcNo5Array = calcNo5(workers);
  const calcActuaryFactorArray = calcActuaryFactor(workers);
  const compensationArray = compensationCalculate(workers);
  const commitmentArray = [];
  const assetsArray = [];

  for (let i = 0; i < workers.length; i++) {
    const { id, payProp, compCheck, deposits } = workers[i];
    const hackathonValue = compensationArray[i].value;
    const oppeningAsset = parseFloat(assets[i].value);
    const compensationValue = parseFloat(compensation[i].value);
    const calcNo1Value = calcNo1Array[i].value;
    const calcNo2Value = calcNo2Array[i].value;
    const calcNo3Value = calcNo3Array[i].value;
    const calcNo4Value = calcNo4Array[i].value;
    const calcNo5Value = calcNo5Array[i].value;
    const calcActuaryFactorValue = calcActuaryFactorArray[i].value;
    const benefits = parseFloat(payProp) + parseFloat(compCheck);

    commitmentArray.push({
      id,
      compensationValue,
      calcNo1Value,
      calcNo2Value,
      benefits,
      calcNo3Value,
      hackathonValue,
      calcActuaryFactorValue,
    });

    assetsArray.push({ id, oppeningAsset, calcNo4Value, deposits, payProp, calcNo5Value, hackathonValue });
  }

  fs.writeFile('commitment.json', JSON.stringify(commitmentArray), function (err) {
    if (err) throw err;
    console.log('complete!');
  });

  fs.writeFile('assets.json', JSON.stringify(assetsArray), function (err) {
    if (err) throw err;
    console.log('complete!');
  });
  return assetsArray;
};

// console.log(calcNo1(workers));

// console.log(calcNo2([workers[2]]));
// console.log(calcNo2(workers));
// console.log(interestRateCalculation(workers));
// calcNo1([workers[54]]);
console.log(calcActuaryFactor(workers));
// export default compensationCalculate
