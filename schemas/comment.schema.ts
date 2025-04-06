import { z } from 'zod';

export const commentSchema = {
  create: z.object({
    body: z.object({
      content: z.string().min(10).max(500),
      rating: z.number().int().min(1).max(5),
      productId: z.number().int().positive(),
      accountId: z.number().int().positive()
    })
  })
}; 