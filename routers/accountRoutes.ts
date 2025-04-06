import express from 'express';
import { validate } from '../middlewares/validate';
import { accountSchema, accountParamsSchema } from '../schemas/account.schema';
import {
  createAccount,
  getAccountById,
  getAllAccounts,
  updateAccountById,
  deleteAccountById
} from '../controllers/accountController';

const router = express.Router();

router.post('/create', validate(accountSchema.create), createAccount);
router.get('/:id', validate(accountParamsSchema), getAccountById);
router.get('/', getAllAccounts);
router.put('/:id', validate(accountParamsSchema), validate(accountSchema.update), updateAccountById);
router.delete('/:id', validate(accountParamsSchema), deleteAccountById);

export default router; 