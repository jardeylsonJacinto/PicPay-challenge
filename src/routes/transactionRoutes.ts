import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const router = Router();
router.get('/', TransactionController.index);
router.post('/:userId', TransactionController.store);

export default router;
