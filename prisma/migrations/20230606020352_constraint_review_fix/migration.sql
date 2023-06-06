/*
  Warnings:

  - The primary key for the `bookmarks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookmark_ID` on the `bookmarks` table. All the data in the column will be lost.
  - The primary key for the `coffee_shop_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `coffee_shop_categories` table. All the data in the column will be lost.
  - The primary key for the `coffee_shop_devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `coffee_shop_devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_url]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coffee_shop_ID,user_ID]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_coffee_shop_ID_fkey";

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_user_ID_fkey";

-- DropForeignKey
ALTER TABLE "coffee_shop_categories" DROP CONSTRAINT "coffee_shop_categories_category_ID_fkey";

-- DropForeignKey
ALTER TABLE "coffee_shop_categories" DROP CONSTRAINT "coffee_shop_categories_coffee_shop_ID_fkey";

-- DropForeignKey
ALTER TABLE "coffee_shop_devices" DROP CONSTRAINT "coffee_shop_devices_coffee_shop_ID_fkey";

-- DropForeignKey
ALTER TABLE "coffee_shop_devices" DROP CONSTRAINT "coffee_shop_devices_device_ID_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_coffee_shop_ID_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_ID_fkey";

-- AlterTable
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_pkey",
DROP COLUMN "bookmark_ID",
ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("coffee_shop_ID", "user_ID");

-- AlterTable
ALTER TABLE "coffee_shop_categories" DROP CONSTRAINT "coffee_shop_categories_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "coffee_shop_categories_pkey" PRIMARY KEY ("coffee_shop_ID", "category_ID");

-- AlterTable
ALTER TABLE "coffee_shop_devices" DROP CONSTRAINT "coffee_shop_devices_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "coffee_shop_devices_pkey" PRIMARY KEY ("coffee_shop_ID", "device_ID");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "devices_name_key" ON "devices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "images_image_url_key" ON "images"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_coffee_shop_ID_user_ID_key" ON "reviews"("coffee_shop_ID", "user_ID");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "users"("user_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "users"("user_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_categories" ADD CONSTRAINT "coffee_shop_categories_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_categories" ADD CONSTRAINT "coffee_shop_categories_category_ID_fkey" FOREIGN KEY ("category_ID") REFERENCES "categories"("category_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_devices" ADD CONSTRAINT "coffee_shop_devices_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_devices" ADD CONSTRAINT "coffee_shop_devices_device_ID_fkey" FOREIGN KEY ("device_ID") REFERENCES "devices"("device_ID") ON DELETE CASCADE ON UPDATE CASCADE;
