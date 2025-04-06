import { Request, Response } from 'express';
import { accountModel } from '../models/accountModel.js';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';

export const createAccount = async (req: Request, res: Response) => {
  const account = await accountModel.create(req.body);
  res.status(201).json(account);
};

export const getAccountById = async (req: Request, res: Response) => {
  const account = await accountModel.findById(Number(req.params.id));
  if (!account) {
    throw new AppError('Account not found', 404);
  }
  res.json(account);
};

export const getAllAccounts = async (req: Request, res: Response) => {
  const accounts = await accountModel.findAll();
  res.json(accounts);
};

export const updateAccount = async (req: Request, res: Response) => {
  const account = await accountModel.update(Number(req.params.id), req.body);
  if (!account) {
    throw new AppError('Account not found', 404);
  }
  res.json(account);
};

export const deleteAccount = async (req: Request, res: Response) => {
  const account = await accountModel.delete(Number(req.params.id));
  if (!account) {
    throw new AppError('Account not found', 404);
  }
  res.status(204).send();
};

