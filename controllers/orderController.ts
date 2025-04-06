import { Request, Response } from 'express';
import { orderModel } from '../models/orderModel.js';
import { AppError } from '../utils/AppError';

export const createOrder = async (req: Request, res: Response) => {
  const order = await orderModel.create(req.body);
  res.status(201).json(order);
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await orderModel.findById(Number(req.params.id));
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  res.json(order);
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderModel.findAll();
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await orderModel.updateStatus(Number(req.params.id), req.body.status);
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  res.json(order);
};

export const deleteOrderById = async (req: Request, res: Response) => {
  const order = await orderModel.delete(Number(req.params.id));
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  res.status(204).send();
}; 