import { z } from 'zod';

export const discountCodeSchema = {
  create: z.object({
    code: z.string().min(3).max(20),
    percentage: z.number().min(1).max(100),
    validFrom: z.date(),
    validTo: z.date(),
    maxUses: z.number().int().positive()
  }),
  update: z.object({
    code: z.string().min(3).max(20).optional(),
    percentage: z.number().min(1).max(100).optional(),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
    maxUses: z.number().int().positive().optional()
  })
}; 