import { Request, Response } from 'express';
import { discountCodeModel } from '../models/discountCodeModel.js';
import { AppError } from '../utils/AppError';

export const createDiscountCode = async (req: Request, res: Response) => {
  const discountCode = await discountCodeModel.create(req.body);
  res.status(201).json(discountCode);
};

export const getDiscountCodeById = async (req: Request, res: Response) => {
  const discountCode = await discountCodeModel.findById(Number(req.params.id));
  if (!discountCode) {
    throw new AppError('Discount code not found', 404);
  }
  res.json(discountCode);
};

export const getDiscountCodeByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const discountCode = await discountCodeModel.findByCode(code);
  if (!discountCode) {
    throw new AppError('Discount code not found', 404);
  }
  res.json(discountCode);
};

export const getAllDiscountCodes = async (req: Request, res: Response) => {
  const discountCodes = await discountCodeModel.findAll();
  res.json(discountCodes);
};

export const updateDiscountCodeById = async (req: Request, res: Response) => {
  const discountCode = await discountCodeModel.update(Number(req.params.id), req.body);
  if (!discountCode) {
    throw new AppError('Discount code not found', 404);
  }
  res.json(discountCode);
};

export const deleteDiscountCodeById = async (req: Request, res: Response) => {
  const discountCode = await discountCodeModel.delete(Number(req.params.id));
  if (!discountCode) {
    throw new AppError('Discount code not found', 404);
  }
  res.status(204).send();
}; 