import express from 'express';
import { getInterestRateTable } from '../controllers/interesRateController';

const router = express.Router();

router.route('/').get(getInterestRateTable);

export default router;
