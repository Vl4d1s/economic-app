import interestRate from '../data/interestRate.json';

export function getInterestRateTable(req, res) {
  res.status(200).send({ data: interestRate });
}
