import express from 'express';
import { validate } from '../middlewares/validate';
import { commentSchema } from '../schemas/comment.schema';
import {
  createComment,
  getCommentById,
  getAllComments,
  updateComment,
  deleteComment,
  getCommentsByProductId
} from '../controllers/commentController';

const router = express.Router();

router.post('/create', validate(commentSchema.create), createComment);
router.get('/:id', getCommentById);
router.get('/', getAllComments);
router.get('/product/:productId', getCommentsByProductId);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router; 