import express from 'express';
import { validate } from '../middlewares/validate';
import { discountCodeSchema } from '../schemas/discountCode.schema';
import {
  createDiscountCode,
  getDiscountCodeById,
  getAllDiscountCodes,
  updateDiscountCodeById,
  deleteDiscountCodeById
} from '../controllers/discountCodeController';

const router = express.Router();

router.post('/create', validate(discountCodeSchema.create), createDiscountCode);
router.get('/:id', getDiscountCodeById);
router.get('/', getAllDiscountCodes);
router.put('/:id', validate(discountCodeSchema.update), updateDiscountCodeById);
router.delete('/:id', deleteDiscountCodeById);

export default router; 