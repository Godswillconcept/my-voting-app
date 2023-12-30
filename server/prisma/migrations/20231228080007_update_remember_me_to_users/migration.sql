/*
  Warnings:

  - You are about to drop the column `rememberMe` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `rememberMe`,
    ADD COLUMN `remember_me` VARCHAR(191) NULL;
