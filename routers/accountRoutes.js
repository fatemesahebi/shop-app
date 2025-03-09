const express = require('express');
const router = express.Router();
const { getAccountById, getAllAccounts, updateAccountById, deleteAccountById, createAccount } = require('../services/accountController');

router.post('/createAccount/:accountId', createAccount);
router.get('/getAccountById/:accountId', getAccountById);
router.get('/getAllAccounts', getAllAccounts);
router.put('/updateAccountById/:id', updateAccountById);
router.delete('/deleteAccountById/:id', deleteAccountById);

module.exports = router;