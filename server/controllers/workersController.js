import workers from '../data/workers.json';

export function getWorkersTable(req, res) {
  res.status(200).send({ data: workers });
}
