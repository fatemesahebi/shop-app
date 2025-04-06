import prisma from '../prisma/client';

export const discountCodeModel = {
  async create(data: {
    code: string;
    percentage: number;
    validFrom: Date;
    validTo: Date;
    maxUses: number;
  }) {
    return prisma.discountCode.create({ data });
  },

  async findById(id: number) {
    return prisma.discountCode.findUnique({ where: { id } });
  },

  async findByCode(code: string) {
    return prisma.discountCode.findUnique({ where: { code } });
  },

  async findAll() {
    return prisma.discountCode.findMany();
  },

  async update(id: number, data: {
    code?: string;
    percentage?: number;
    validFrom?: Date;
    validTo?: Date;
    maxUses?: number;
  }) {
    return prisma.discountCode.update({
      where: { id },
      data
    });
  },

  async delete(id: number) {
    return prisma.discountCode.delete({ where: { id } });
  }
}; 