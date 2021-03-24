import lifeTableWomens from '../data/lifeTableWomens.json';

export function getWomensLifeTable(req, res) {
  res.status(200).send({ data: lifeTableWomens });
}
