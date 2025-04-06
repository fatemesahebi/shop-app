import { Request, Response, NextFunction } from 'express';
import { orderModel } from '../models/orderModel.js';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountId, items } = req.body;
    const order = await orderModel.create({
      accountId,
      items
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(Number(id));
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await orderModel.updateStatus(Number(id), status);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await orderModel.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 