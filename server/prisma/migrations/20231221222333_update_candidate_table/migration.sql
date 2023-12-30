-- DropForeignKey
ALTER TABLE `candidate` DROP FOREIGN KEY `Candidate_platform_id_fkey`;

-- AlterTable
ALTER TABLE `candidate` MODIFY `platform_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `Platform`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
