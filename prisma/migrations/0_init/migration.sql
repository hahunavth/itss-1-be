-- CreateTable
CREATE TABLE "coffee_shops" (
    "coffee_shop_ID" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "opening_at" TIMESTAMP(3) NOT NULL,
    "closing_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT DEFAULT '',
    "phone_number" VARCHAR(10) NOT NULL,
    "status" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "verified" INTEGER NOT NULL,
    "owner_ID" INTEGER,
    "crowded_hours" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]::INTEGER[],
    "images" TEXT[],

    CONSTRAINT "coffee_shops_pkey" PRIMARY KEY ("coffee_shop_ID")
);

-- CreateTable
CREATE TABLE "users" (
    "user_ID" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "phone_number" VARCHAR(10),
    "date_of_birth" TIMESTAMP(3),
    "image_url" TEXT,
    "role" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_ID")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_ID" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coffee_shop_ID" INTEGER NOT NULL,
    "user_ID" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_ID")
);

-- CreateTable
CREATE TABLE "images" (
    "image_ID" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "coffee_shop_ID" INTEGER NOT NULL,
    "review_ID" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_ID")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "coffee_shop_ID" INTEGER NOT NULL,
    "user_ID" INTEGER NOT NULL,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("coffee_shop_ID","user_ID")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_ID")
);

-- CreateTable
CREATE TABLE "devices" (
    "device_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("device_ID")
);

-- CreateTable
CREATE TABLE "coffee_shop_categories" (
    "coffee_shop_ID" INTEGER NOT NULL,
    "category_ID" INTEGER NOT NULL,

    CONSTRAINT "coffee_shop_categories_pkey" PRIMARY KEY ("coffee_shop_ID","category_ID")
);

-- CreateTable
CREATE TABLE "coffee_shop_devices" (
    "coffee_shop_ID" INTEGER NOT NULL,
    "device_ID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "coffee_shop_devices_pkey" PRIMARY KEY ("coffee_shop_ID","device_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "images_image_url_key" ON "images"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "devices_name_key" ON "devices"("name");

-- AddForeignKey
ALTER TABLE "coffee_shops" ADD CONSTRAINT "coffee_shops_owner_ID_fkey" FOREIGN KEY ("owner_ID") REFERENCES "users"("user_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "users"("user_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_review_ID_fkey" FOREIGN KEY ("review_ID") REFERENCES "reviews"("review_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "users"("user_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_categories" ADD CONSTRAINT "coffee_shop_categories_category_ID_fkey" FOREIGN KEY ("category_ID") REFERENCES "categories"("category_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_categories" ADD CONSTRAINT "coffee_shop_categories_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_devices" ADD CONSTRAINT "coffee_shop_devices_coffee_shop_ID_fkey" FOREIGN KEY ("coffee_shop_ID") REFERENCES "coffee_shops"("coffee_shop_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_shop_devices" ADD CONSTRAINT "coffee_shop_devices_device_ID_fkey" FOREIGN KEY ("device_ID") REFERENCES "devices"("device_ID") ON DELETE CASCADE ON UPDATE CASCADE;

