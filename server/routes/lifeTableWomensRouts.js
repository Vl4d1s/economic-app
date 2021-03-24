import express from 'express';
import { getWomensLifeTable } from '../controllers/lifeTableWomensRoutsController';
const router = express.Router();

router.route('/').get(getWomensLifeTable);

export default router;
