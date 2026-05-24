/*
  Warnings:

  - You are about to drop the column `deadline` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `deadline`,
    DROP COLUMN `projectId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dueDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `project`;
