import { PrismaClient, OrderStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // Create sample accounts
  const password = await bcrypt.hash('password123', 10);
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        name: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password
      }
    }),
    prisma.account.create({
      data: {
        name: 'Jane',
        lastname: 'Smith',
        email: 'jane@example.com',
        phoneNumber: '0987654321',
        password
      }
    })
  ]);

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop',
        description: 'High-performance laptop with 16GB RAM',
        price: 999.99,
        image: undefined
      }
    }),
    prisma.product.create({
      data: {
        name: 'Smartphone',
        description: 'Latest smartphone with 5G capability',
        price: 699.99,
        image: undefined
      }
    }),
    prisma.product.create({
      data: {
        name: 'Headphones',
        description: 'Wireless noise-cancelling headphones',
        price: 199.99,
        image: undefined
      }
    })
  ]);

  // Create sample orders with items
  await Promise.all([
    prisma.order.create({
      data: {
        accountId: accounts[0].id,
        status: OrderStatus.FINISHED,
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 1
            },
            {
              productId: products[2].id,
              quantity: 2
            }
          ]
        }
      }
    }),
    prisma.order.create({
      data: {
        accountId: accounts[1].id,
        status: OrderStatus.IN_PROGRESS,
        items: {
          create: [
            {
              productId: products[1].id,
              quantity: 1
            }
          ]
        }
      }
    })
  ]);

  // Create sample comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Great product! Very satisfied with my purchase.',
        rating: 5,
        productId: products[0].id,
        accountId: accounts[0].id
      }
    }),
    prisma.comment.create({
      data: {
        content: 'Good quality but a bit expensive.',
        rating: 4,
        productId: products[1].id,
        accountId: accounts[1].id
      }
    })
  ]);

  // Create sample discount codes
  await Promise.all([
    prisma.discountCode.create({
      data: {
        code: 'WELCOME10',
        percentage: 10,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        maxUses: 100
      }
    }),
    prisma.discountCode.create({
      data: {
        code: 'SUMMER20',
        percentage: 20,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        maxUses: 50
      }
    })
  ]);

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 