import { z } from 'zod';

export const productSchema = {
  create: z.object({
    body: z.object({
      name: z.string().min(2).max(100),
      description: z.string().min(10),
      price: z.number().positive(),
      image: z.string().optional()
    })
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(2).max(100).optional(),
      description: z.string().min(10).optional(),
      price: z.number().positive().optional(),
      image: z.string().optional()
    })
  })
}; 