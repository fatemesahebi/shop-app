import prisma from '../prisma/client';

export const commentModel = {
  async create(data: {
    content: string;
    rating: number;
    productId: number;
    accountId: number;
  }) {
    return prisma.comment.create({ data });
  },

  async findById(id: number) {
    return prisma.comment.findUnique({ where: { id } });
  },

  async findAll() {
    return prisma.comment.findMany();
  },

  async findByProductId(productId: number) {
    return prisma.comment.findMany({
      where: { productId }
    });
  },

  async update(id: number, data: {
    content?: string;
    rating?: number;
  }) {
    return prisma.comment.update({
      where: { id },
      data
    });
  },

  async delete(id: number) {
    return prisma.comment.delete({ where: { id } });
  }
}; 