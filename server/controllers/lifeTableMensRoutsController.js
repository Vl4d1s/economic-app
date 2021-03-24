import lifeTableMens from '../data/lifeTableMens.json';

export function getMensLifeTable(req, res) {
  res.status(200).send({ data: lifeTableMens });
}
