import express from 'express';
import { validate } from '../middlewares/validate';
import { orderSchema } from '../schemas/order.schema';
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrderById
} from '../controllers/orderController';

const router = express.Router();

router.post('/create', validate(orderSchema.create), createOrder);
router.get('/:id', getOrderById);
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrderById);

export default router; 