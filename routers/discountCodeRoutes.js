const express = require('express');
const router = express.Router();
const { getDiscountCodeById, getAllDiscountCodes, updateDiscountCodeById, deleteDiscountCodeById, createDiscountCode } = require('../services/DiscountCodeController');

router.post('/createDiscountCode', createDiscountCode);
router.get('/getDiscountCodeById/:DiscountCodeId', getDiscountCodeById);
router.get('/getAllDiscountCodes', getAllDiscountCodes);
router.put('/updateDiscountCodeById/:id', updateDiscountCodeById);
router.delete('/deleteDiscountCodeById/:id', deleteDiscountCodeById);

module.exports = router;