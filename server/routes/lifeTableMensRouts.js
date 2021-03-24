import express from 'express';
import { getMensLifeTable } from '../controllers/lifeTableMensRoutsController';

const router = express.Router();

router.route('/').get(getMensLifeTable);

export default router;
