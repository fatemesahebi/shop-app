import { Request, Response, NextFunction } from 'express';
import { discountCodeModel } from '../models/discountCodeModel.js';

export const createDiscountCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, percentage, validFrom, validTo, maxUses } = req.body;
    const discountCode = await discountCodeModel.create({
      code,
      percentage,
      validFrom: new Date(validFrom),
      validTo: new Date(validTo),
      maxUses
    });

    res.status(201).json(discountCode);
  } catch (error) {
    next(error);
  }
};

export const getDiscountCodeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const discountCode = await discountCodeModel.findById(Number(id));
    
    if (!discountCode) {
      return res.status(404).json({ message: 'Discount code not found' });
    }

    res.json(discountCode);
  } catch (error) {
    next(error);
  }
};

export const getDiscountCodeByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const discountCode = await discountCodeModel.findByCode(code);
    
    if (!discountCode) {
      return res.status(404).json({ message: 'Discount code not found' });
    }

    res.json(discountCode);
  } catch (error) {
    next(error);
  }
};

export const getAllDiscountCodes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discountCodes = await discountCodeModel.findAll();
    res.json(discountCodes);
  } catch (error) {
    next(error);
  }
};

export const updateDiscountCodeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { code, percentage, validFrom, validTo, maxUses } = req.body;
    
    const updateData: any = {};
    if (code) updateData.code = code;
    if (percentage) updateData.percentage = percentage;
    if (validFrom) updateData.validFrom = new Date(validFrom);
    if (validTo) updateData.validTo = new Date(validTo);
    if (maxUses) updateData.maxUses = maxUses;

    const discountCode = await discountCodeModel.update(Number(id), updateData);
    
    if (!discountCode) {
      return res.status(404).json({ message: 'Discount code not found' });
    }

    res.json(discountCode);
  } catch (error) {
    next(error);
  }
};

export const deleteDiscountCodeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await discountCodeModel.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 