/*
  Warnings:

  - You are about to drop the column `business_hours` on the `coffee_shops` table. All the data in the column will be lost.
  - Added the required column `closing_at` to the `coffee_shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening_at` to the `coffee_shops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coffee_shops" DROP COLUMN "business_hours",
ADD COLUMN     "closing_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "opening_at" TIMESTAMP(3) NOT NULL;
