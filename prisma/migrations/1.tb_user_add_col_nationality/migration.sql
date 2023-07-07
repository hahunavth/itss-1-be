/*
  Warnings:

  - Made the column `nationality` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable

ALTER TABLE users
  ADD COLUMN "nationality" VARCHAR(30) DEFAULT '日本';
ALTER TABLE "users" ALTER COLUMN "nationality" SET NOT NULL;
