/*
  Warnings:

  - Added the required column `poll_id` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `poll_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `platform` MODIFY `emblem` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_poll_id_fkey` FOREIGN KEY (`poll_id`) REFERENCES `Poll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
