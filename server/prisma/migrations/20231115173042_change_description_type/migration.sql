/*
  Warnings:

  - Made the column `description` on table `platform` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `platform` MODIFY `description` TEXT NOT NULL;
