import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error
  let error = {
    statusCode: 500,
    status: 'error',
    message: 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      error = {
        statusCode: 400,
        status: 'fail',
        message: 'Duplicate field value entered',
        stack: undefined
      };
    }
    if (err.code === 'P2025') {
      error = {
        statusCode: 404,
        status: 'fail',
        message: 'Record not found',
        stack: undefined
      };
    }
  }

  // Handle AppError
  if (err instanceof AppError) {
    error = {
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    error = {
      statusCode: 400,
      status: 'fail',
      message: err.message,
      stack: undefined
    };
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      statusCode: 401,
      status: 'fail',
      message: 'Invalid token. Please log in again!',
      stack: undefined
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      statusCode: 401,
      status: 'fail',
      message: 'Your token has expired! Please log in again.',
      stack: undefined
    };
  }

  // Send error response
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(error.stack && { stack: error.stack })
  });
}; 