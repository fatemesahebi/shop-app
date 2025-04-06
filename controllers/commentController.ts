import { Request, Response } from 'express';
import { commentModel } from '../models/commentModel.js';
import { AppError } from '../utils/AppError';

export const createComment = async (req: Request, res: Response) => {
  const comment = await commentModel.create(req.body);
  res.status(201).json(comment);
};

export const getCommentById = async (req: Request, res: Response) => {
  const comment = await commentModel.findById(Number(req.params.id));
  if (!comment) {
    throw new AppError('Comment not found', 404);
  }
  res.json(comment);
};

export const getAllComments = async (req: Request, res: Response) => {
  const comments = await commentModel.findAll();
  res.json(comments);
};

export const getCommentsByProductId = async (req: Request, res: Response) => {
  const comments = await commentModel.findByProductId(Number(req.params.productId));
  res.json(comments);
};

export const updateComment = async (req: Request, res: Response) => {
  const comment = await commentModel.update(Number(req.params.id), req.body);
  if (!comment) {
    throw new AppError('Comment not found', 404);
  }
  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const comment = await commentModel.delete(Number(req.params.id));
  if (!comment) {
    throw new AppError('Comment not found', 404);
  }
  res.status(204).send();
}; 