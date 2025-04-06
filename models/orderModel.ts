import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const orderModel = {
  async create(data: {
    accountId: number;
    status?: OrderStatus;
    items: {
      productId: number;
      quantity: number;
    }[];
  }) {
    return prisma.order.create({
      data: {
        accountId: data.accountId,
        status: data.status || OrderStatus.IN_PROGRESS,
        items: {
          create: data.items
        }
      },
      include: {
        items: true
      }
    });
  },

  async findById(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true
      }
    });
  },

  async findAll() {
    return prisma.order.findMany({
      include: {
        items: true
      }
    });
  },

  async updateStatus(id: number, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status }
    });
  },

  async delete(id: number) {
    return prisma.order.delete({ where: { id } });
  }
}; 