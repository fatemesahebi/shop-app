/*
  Warnings:

  - You are about to drop the column `description` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `DiscountCode` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `DiscountCode` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `accountOrderId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `AccountOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `DiscountCode` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `maxUses` to the `DiscountCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `DiscountCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validFrom` to the `DiscountCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validTo` to the `DiscountCode` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `DiscountCode` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AccountOrder" DROP CONSTRAINT "AccountOrder_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountOrder" DROP CONSTRAINT "AccountOrder_discountCodeId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_accountId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_accountOrderId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "title",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "DiscountCode" DROP COLUMN "amount",
DROP COLUMN "expirationDate",
ADD COLUMN     "maxUses" INTEGER NOT NULL,
ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "validFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "validTo" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "accountId",
DROP COLUMN "accountOrderId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount",
DROP COLUMN "image",
DROP COLUMN "status",
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "AccountOrder";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DiscountCode_code_key" ON "DiscountCode"("code");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
