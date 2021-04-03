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
  Object.keys(obj).map(function (key, index) {
    obj[key] = valuesToParse.includes(key) ? parseFloat(obj[key]) : obj[key];
  });
}

function main(workers) {
  const valuesToParse = ['lastSalary', 'propValue', 'deposits', 'payProp', 'compCheck'];
  workers.map(worker => {
    parseFloatWorkerValues(worker, valuesToParse);
    calculate(worker);
  });
}

function calculate(worker) {
  const { sex, birthDate, startJobDate, lastSalary, art14StartingDate, propValue, art14Percent } = worker;
  const age = Math.floor(diffYearMonthDay(x, birthDate).year);
  const startJobAge = Math.floor(diffYearMonthDay(startJobDate, birthDate).year);
  const w = retireAge[sex];
  const seniority = diffYearMonthDay(x, startJobDate).year;
  const firstCalculation = lastSalary * seniority * (1 - art14Percent);

  const compensationReason = {
    DISMISSAL: 'dismissal',
    RESINGNATION: 'resignation',
    DIE: 'die',
  };

  function sum_name(val) {
    let Px = 0;
    let sum = 0;
    let Qx = 0;

    for (let t = 0; t <= w - age - 2; t++) {
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
    return sum;
  }

  const sum1 = sum_name(compensationReason.DISMISSAL);
  const sum3 = sum_name(compensationReason.DIE);
  const sum2 = sum_name(compensationReason.RESINGNATION);

  const finalSum = sum1 + sum2 + sum3;
  console.log(finalSum);
}

main([workers[3]]);
