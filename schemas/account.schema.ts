import { z } from 'zod';

export const accountSchema = {
  create: z.object({
    body: z.object({
      name: z.string().min(2).max(50),
      lastname: z.string().min(2).max(50),
      email: z.string().email(),
      phoneNumber: z.string().min(10).max(15),
      password: z.string().min(6)
    })
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(2).max(50).optional(),
      lastname: z.string().min(2).max(50).optional(),
      email: z.string().email().optional(),
      phoneNumber: z.string().min(10).max(15).optional(),
      password: z.string().min(6).optional()
    })
  })
};

export const accountParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric'),
  }),
});