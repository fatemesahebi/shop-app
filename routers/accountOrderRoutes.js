const express = require('express');
const router = express.Router();
const { getAccountOrderById, getAllAccountOrders, updateAccountOrderStatusById, deleteAccountOrderById, createAccountOrder } = require('../services/AccountOrderController');

router.get('/getAccountOrderById/:AccountOrderId', getAccountOrderById);
router.post('/createAccountOrder', createAccountOrder);
router.get('/getAllAccountOrders', getAllAccountOrders);
router.put('/updateAccountOrderStatusById/:id', updateAccountOrderStatusById);
router.delete('/deleteAccountOrderById/:id', deleteAccountOrderById);

module.exports = router;