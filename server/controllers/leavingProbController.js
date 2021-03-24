import leavingProb from '../data/leavingProb.json';

export function getLeavingProbTable(req, res) {
  res.status(200).send({ data: leavingProb });
}
