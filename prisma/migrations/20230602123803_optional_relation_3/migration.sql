-- DropForeignKey
ALTER TABLE "coffee_shops" DROP CONSTRAINT "coffee_shops_owner_ID_fkey";

-- DropIndex
DROP INDEX "coffee_shops_owner_ID_key";

-- AlterTable
ALTER TABLE "coffee_shops" ALTER COLUMN "owner_ID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "coffee_shops" ADD CONSTRAINT "coffee_shops_owner_ID_fkey" FOREIGN KEY ("owner_ID") REFERENCES "users"("user_ID") ON DELETE SET NULL ON UPDATE CASCADE;
