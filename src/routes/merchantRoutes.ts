import { Router } from 'express';
import MerchantController from '../controllers/MerchantController';

const router = Router();
router.get('/', MerchantController.index);
router.post('/', MerchantController.store);

export default router;
