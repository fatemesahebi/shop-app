import express from 'express';
import { validate } from '../middlewares/validate';
import { accountSchema, accountParamsSchema } from '../schemas/account.schema';
import {
  createAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
  deleteAccount
} from '../controllers/accountController';

const router = express.Router();

router.post('/create', validate(accountSchema.create), createAccount);
router.get('/:id', validate(accountParamsSchema), getAccountById);
router.get('/', getAllAccounts);
router.put('/:id', validate(accountParamsSchema), validate(accountSchema.update), updateAccount);
router.delete('/:id', validate(accountParamsSchema), deleteAccount);

export default router; 