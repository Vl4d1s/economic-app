import express from 'express';
import { getLeavingProbTable } from '../controllers/leavingProbController';
const router = express.Router();

router.route('/').get(getLeavingProbTable);

export default router;
