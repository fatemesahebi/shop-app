const express = require('express');
const router = express.Router();
const { getCommentById, getAllComments, updateCommentById, deleteCommentById, createCommentForProduct, getCommentsByProduct } = require('../services/CommentController');

router.post('/createCommentForProduct', createCommentForProduct);
router.get('/getCommentById/:CommentId', getCommentById);
router.get('/getCommentsByProduct/:productId', getCommentsByProduct);
router.get('/getAllComments', getAllComments);
router.put('/updateCommentById/:id', updateCommentById);
router.delete('/deleteCommentById/:id', deleteCommentById);

module.exports = router;