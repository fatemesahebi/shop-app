import { Request, Response } from 'express';
import { productModel } from '../models/productModel.js';
import { AppError } from '../utils/AppError';

export const createProduct = async (req: Request, res: Response) => {
  const product = await productModel.create(req.body);
  res.status(201).json(product);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await productModel.findById(Number(req.params.id));
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  res.json(product);
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productModel.findAll();
  res.json(products);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await productModel.update(Number(req.params.id), req.body);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await productModel.delete(Number(req.params.id));
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  res.status(204).send();
}; 