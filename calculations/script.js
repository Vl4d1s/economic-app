const workers = require('./workers.json');
const lifeTableWomens = require('./lifeTableWomens.json');
const lifeTableMens = require('./lifeTableMens.json');
const leavingProb = require('./leavingProb.json');
const interestRate = require('./interestRate.json');

const getDateDifference = (fistDate, secondDate) =>
  Math.floor((new Date(fistDate) - new Date(secondDate.split('-').join(',')).getTime()) / 3.15576e10);

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
const age = getDateDifference(x, worker.birthDate); // 54
const w = workers[3] === 'F' ? 64 : 67; // 64
const seniority = getDateDifference(x, worker.startJobDate); // 18
workers[3].art14Percent = 0; // changin '' to 0 for the formula.
const salaryGrowthRate = 0.2; // constant given by Anna.
const retAge = w - age - 2; // Sub range: 0 - retAge

const firstCalculation = worker.salary * seniority * (1 - worker.art14Percent);

let sum1 = 0;
let sum2 = 0;
let sum3 = 0;

for (let t = 0; t <= retAge; t++) {
  const disProb = leavingProb[age + t + 1];

  const dismissalProb = parseFloat(disProb.dismissal);
  const resignationProb = parseFloat(disProb.resignation);
  const discountRate = parseFloat(interestRate[t + 1].discountRate);

  const Px = t === 0 ? 1 : 1 - dismissalProb - resignationProb;
  const Qx = resignationProb;
  const numerator = Math.pow(1 + salaryGrowthRate, t + 0.5) * Px * Qx;
  const denominator = Math.pow(1 + discountRate, t + 0.5);

  sum1 = firstCalculation * (numerator / denominator);
}
