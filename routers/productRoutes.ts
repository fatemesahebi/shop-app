import express from 'express';
import { validate } from '../middlewares/validate';
import { productSchema } from '../schemas/product.schema';
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

router.post('/create', validate(productSchema.create), createProduct);
router.get('/:id', getProductById);
router.get('/', getAllProducts);
router.put('/:id', validate(productSchema.update), updateProduct);
router.delete('/:id', deleteProduct);

export default router; 