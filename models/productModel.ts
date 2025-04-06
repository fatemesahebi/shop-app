import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productModel = {
  async create(data: {
    name: string;
    description: string;
    price: number;
  }) {
    return prisma.product.create({ data });
  },

  async findById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  },

  async findAll() {
    return prisma.product.findMany();
  },

  async update(id: number, data: {
    name?: string;
    description?: string;
    price?: number;
  }) {
    return prisma.product.update({
      where: { id },
      data
    });
  },

  async delete(id: number) {
    return prisma.product.delete({ where: { id } });
  }
}; 