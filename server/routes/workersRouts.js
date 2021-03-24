import express from 'express';
import { getWorkersTable } from '../controllers/workersController';

const router = express.Router();

router.route('/').get(getWorkersTable);

export default router;
