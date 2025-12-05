/*
  Warnings:

  - You are about to drop the column `logo` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `logoUrl` to the `brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brand` DROP COLUMN `logo`,
    ADD COLUMN `logoUrl` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `cars`;

-- CreateTable
CREATE TABLE `car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `brandId` INTEGER NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `fueltype` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `car` ADD CONSTRAINT `car_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
