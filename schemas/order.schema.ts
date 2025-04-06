import { z } from 'zod';

export const orderSchema = {
  create: z.object({
    body: z.object({
      accountId: z.number().int().positive(),
      status: z.enum(['IN_PROGRESS', 'FINISHED', 'CANCELED', 'SENDING']).optional(),
      items: z.array(z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive()
      }))
    })
  })
}; 