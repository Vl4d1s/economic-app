const workers = require('./workers.json');
const lifeTableWomens = require('./lifeTableWomens.json');
const lifeTableMens = require('./lifeTableMens.json');
const leavingProbabilityTable = require('./leavingProb.json');
const interestRateTable = require('./interestRate.json');

const getAge = (fistDate, secondDate) =>
  Math.floor((new Date(fistDate) - new Date(secondDate.split('-').join(',')).getTime()) / 3.15576e10);

const getSeniority = (fistDate, secondDate) =>
  (new Date(fistDate) - new Date(secondDate.split('-').join(',')).getTime()) / 3.15576e10;

// {
//   id: '4',
//   firstName: 'אירית',
//   lastName: 'אשכנזי',
//   sex: 'F',
//   birthDate: '1966-08-06',
//   startJobDate: '2002-04-07',
//   salary: '10200',
//   art14StartingDate: '',
//   art14Percent: '',
//   propValue: '119000',
//   deposits: '10200',
//   leavingDate: '',
//   payProp: '0',
//   compCheck: '0'
// }
const x = '2020,12,31';
const worker = workers[3]; // no art14 - 151,583
const age = getAge(x, worker.birthDate); // 54
const sex = workers[3].sex;
const w = sex === 'F' ? 64 : 67; // 64
const seniority = getSeniority(x, worker.startJobDate); // 18
workers[3].art14Percent = 0; // changin '' to 0 for the formula.
const salaryGrowthRate = 0.02; // constant given by Anna.
const retAge = w - age - 2; // Sub range: 0 - retAge

const firstCalculation = parseFloat(worker.salary) * seniority * (1 - worker.art14Percent);

let sum1 = 0;
let sum2 = 0;
let sum3 = 0;

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

  const Qx = dieProbability;

  const numerator = Math.pow(1 + salaryGrowthRate, power) * Px * Qx;
  const denominator = Math.pow(1 + DiscountRate, power);

  sum2 += firstCalculation * (numerator / denominator);
}

console.log(`sum1: ${sum1}, sum2: ${sum2}, sum1+sum2: ${sum1 + sum2}`);
