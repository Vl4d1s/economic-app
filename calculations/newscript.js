const workers = require('./workers.json');
const lifeTable = require('./lifeTable.json');
const leavingProbabilityTable = require('./leavingProb.json');
const interestRateTable = require('./interestRate.json');

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
  Object.keys(obj).map(function (key) {
    obj[key] = valuesToParse.includes(key) ? parseFloat(obj[key]) : obj[key];
  });
}

function main(workers) {
  const valuesToParse = ['lastSalary', 'propValue', 'deposits', 'payProp', 'compCheck', 'art14Percent'];
  if (workers.length > 0) {
    workers.map(worker => {
      parseFloatWorkerValues(worker, valuesToParse);
      calculate(worker);
    });
  }
}

function calculate(worker) {
  const {
    id,
    sex,
    birthDate,
    startJobDate,
    lastSalary,
    art14StartingDate,
    propValue,
    art14Percent,
    leavingDate,
  } = worker;
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

  console.log(`id:${id} finalSum: ${finalSum}`);
}

main([workers[18]]);
