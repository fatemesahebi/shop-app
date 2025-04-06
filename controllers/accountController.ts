import { Request, Response, NextFunction } from 'express';
import { accountModel } from '../models/accountModel.js';
import bcrypt from 'bcrypt';


export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastname, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const account = await accountModel.create({
      name,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword
    });

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const account = await accountModel.findById(Number(id));
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
};

export const getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await accountModel.findAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
};

export const updateAccountById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phoneNumber, password } = req.body;
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (lastname) updateData.lastname = lastname;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const account = await accountModel.update(Number(id), updateData);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
};

export const deleteAccountById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await accountModel.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

