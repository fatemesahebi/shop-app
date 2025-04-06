import prisma from '../prisma/client';

export const accountModel = {
  async create(data: { 
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) {
    return prisma.account.create({ data });
  },

  async findById(id: number) {
    return prisma.account.findUnique({ where: { id } });
  },

  async findByEmail(email: string) {
    return prisma.account.findUnique({ where: { email } });
  },

  async findAll() {
    return prisma.account.findMany();
  },

  async update(id: number, data: {
    name?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }) {
    return prisma.account.update({
      where: { id },
      data
    });
  },

  async delete(id: number) {
    return prisma.account.delete({ where: { id } });
  }
}; 