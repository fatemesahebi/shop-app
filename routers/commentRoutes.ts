import express from 'express';
import { validate } from '../middlewares/validate';
import { commentSchema } from '../schemas/comment.schema';
import {
  createComment,
  getCommentById,
  getAllComments,
  updateCommentById,
  deleteCommentById,
  getCommentsByProduct
} from '../controllers/commentController';

const router = express.Router();

router.post('/create', validate(commentSchema.create), createComment);
router.get('/:id', getCommentById);
router.get('/', getAllComments);
router.get('/product/:productId', getCommentsByProduct);
router.put('/:id', updateCommentById);
router.delete('/:id', deleteCommentById);

export default router; 