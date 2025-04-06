import { Request, Response, NextFunction } from 'express';
import { productModel } from '../models/productModel.js';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price } = req.body;
    const product = await productModel.create({
      name,
      description,
      price
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(Number(id));
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;

    const product = await productModel.update(Number(id), updateData);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await productModel.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 