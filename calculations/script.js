const workers = require('./workers.json');
const lifeTableWomens = require('./lifeTableWomens.json');
const lifeTableMens = require('./lifeTableMens.json');
const leavingProbabilityTable = require('./leavingProb.json');
const interestRateTable = require('./interestRate.json');

const getStartJobAge = (fistDate, secondDate) =>
  Math.floor(
    (new Date(fistDate.split('-').join(',')) - new Date(secondDate.split('-').join(',')).getTime()) / 3.15576e10
  );

const getAge = (fistDate, secondDate) =>
  Math.floor((new Date(fistDate) - new Date(secondDate.split('-').join(',')).getTime()) / 3.15576e10);

const getSeniority = (fistDate, secondDate) =>
  (new Date(fistDate) - new Date(secondDate.split('-').join(',')).getTime()) / 3.15576e10;

// {
//   "id": "11",
//   "firstName": "משה",
//   "lastName": "אבולפיה",
//   "sex": "M",
//   "birthDate": "1972-08-01",
//   "startJobDate": "2002-06-01",
//   "lastSalary": "24012.5",
//   "art14StartingDate": "",
//   "art14Percent": "",
//   "propValue": "323000",
//   "deposits": "24012.5",
//   "leavingDate": "",
//   "payProp": "0",
//   "compCheck": "0"
// },

const x = '2020,12,31';
const worker = workers[10]; // no art14 - 151,583
const age = getAge(x, worker.birthDate); // 54
const sex = worker.sex;
const startJobAge = getStartJobAge(worker.startJobDate, worker.birthDate);
console.log(startJobAge);
const propValue = worker.propValue;
const w = sex === 'F' ? 64 : 67; // 64
const seniority = getSeniority(x, worker.startJobDate); // 18
worker.art14Percent = 0; // changin '' to 0 for the formula.
const salaryGrowthRate = 0.02; // constant given by Anna.
const retAge = w - age - 2; // Sub range: 0 - retAge

const firstCalculation = parseFloat(worker.lastSalary) * seniority * (1 - worker.art14Percent);

let sum1 = 0;
let sum2 = 0;
let sum3 = 0;
let sum4 = 0;

let Px = 1;

// resignation - התפטרות
// dismissal - פיטורין

for (let t = 0; t <= retAge; t++) {
  const currentProbabilityInfo = leavingProbabilityTable[age + t + 1];

  const dismissalProbability = parseFloat(currentProbabilityInfo.dismissal);
  const resignationProbability = parseFloat(currentProbabilityInfo.resignation);
  const dieProbability =
    sex === 'F' ? parseFloat(lifeTableWomens[age + t + 1]['q(x)']) : parseFloat(lifeTableMens[age + t + 1]['q(x)']);
  const DiscountRate = parseFloat(interestRateTable[t + 1].discountRate);
  const power = t + 0.5;

  Px = t === 0 ? 1 : Px * (1 - dismissalProbability - resignationProbability - dieProbability);
  // q1
  const Qx = dismissalProbability;

  const numerator = Math.pow(1 + salaryGrowthRate, power) * Px * Qx;
  const denominator = Math.pow(1 + DiscountRate, power);

  sum1 += firstCalculation * (numerator / denominator);
}

for (let t = 0; t <= retAge; t++) {
  const currentProbabilityInfo = leavingProbabilityTable[age + t + 1];

  const dismissalProbability = parseFloat(currentProbabilityInfo.dismissal);
  const resignationProbability = parseFloat(currentProbabilityInfo.resignation);
  const dieProbability =
    sex === 'F' ? parseFloat(lifeTableWomens[age + t + 1]['q(x)']) : parseFloat(lifeTableMens[age + t + 1]['q(x)']);
  const DiscountRate = parseFloat(interestRateTable[t + 1].discountRate);
  const power = t + 0.5;

  Px = t === 0 ? 1 : Px * (1 - dismissalProbability - resignationProbability - dieProbability);

  // q3
  const Qx = dieProbability;

  const numerator = Math.pow(1 + salaryGrowthRate, power) * Px * Qx;
  const denominator = Math.pow(1 + DiscountRate, power);

  sum2 += firstCalculation * (numerator / denominator);
}

for (let t = 0; t <= retAge; t++) {
  const currentProbabilityInfo = leavingProbabilityTable[age + t + 1];

  const dismissalProbability = parseFloat(currentProbabilityInfo.dismissal);
  const resignationProbability = parseFloat(currentProbabilityInfo.resignation);
  const dieProbability =
    sex === 'F' ? parseFloat(lifeTableWomens[age + t + 1]['q(x)']) : parseFloat(lifeTableMens[age + t + 1]['q(x)']);

  Px = t === 0 ? 1 : Px * (1 - dismissalProbability - resignationProbability - dieProbability);

  // q2
  const Qx = resignationProbability;

  sum3 += propValue * Px * Qx;
}

for (let t = 0; t <= w - age - 1; t++) {
  const currentProbabilityInfo = leavingProbabilityTable[age + t + 1];

  const dismissalProbability = parseFloat(currentProbabilityInfo.dismissal);
  const resignationProbability = parseFloat(currentProbabilityInfo.resignation);
  const dieProbability =
    sex === 'F' ? parseFloat(lifeTableWomens[age + t + 1]['q(x)']) : parseFloat(lifeTableMens[age + t + 1]['q(x)']);

  Px = t === 0 ? 1 : Px * (1 - dismissalProbability - resignationProbability - dieProbability);
}

const Qx1 = parseFloat(leavingProbabilityTable[w - 1].dismissal);
const Qx3 = sex === 'F' ? parseFloat(lifeTableWomens[w - 1]['q(x)']) : parseFloat(lifeTableMens[w - 1]['q(x)']);
const Qx2 = parseFloat(leavingProbabilityTable[w - 1].resignation);

const DiscountRate = parseFloat(interestRateTable[w - startJobAge].discountRate); // w?

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

sum4 = retCalcPart1 + retCalcPart2 + retCalcPart3 + retCalcPart4;

console.log(
  `sum1: ${sum1}, sum2: ${sum2},sum3: ${sum3},sum4: ${sum4}, sum1+sum2+sum3+sum4: ${sum1 + sum2 + sum3 + sum4}`
);
