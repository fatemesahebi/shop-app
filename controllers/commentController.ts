import { Request, Response, NextFunction } from 'express';
import { commentModel } from '../models/commentModel.js';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, rating, productId, accountId } = req.body;
    const comment = await commentModel.create({
      content,
      rating,
      productId,
      accountId
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.findById(Number(id));
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = await commentModel.findAll();
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const comments = await commentModel.findByProductId(Number(productId));
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const updateCommentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;
    
    const updateData: any = {};
    if (content) updateData.content = content;
    if (rating) updateData.rating = rating;

    const comment = await commentModel.update(Number(id), updateData);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await commentModel.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 