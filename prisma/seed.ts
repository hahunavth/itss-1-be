import { CreateCoffeeShopV2Dto } from './../src/coffee-shop-v2/dto/create-coffee-shop-v2.dto';
import { PrismaClient, coffee_shops } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { writeFile } from 'fs';
import { coffeeShops, users, reviews } from './data';
import { isArray } from 'class-validator';
const prisma = new PrismaClient();

async function getListWithIdMap(param: {
  dataList: any[];
  getQuery: (data: any) => object;
  getItem: (data: any, query: any) => Promise<{ data: any; _id: any }>;
  getPrismaItemList: (() => Promise<any[]>) | null;
  prismaItemToCreateDto: ((item: any) => any) | null;
  requiredKeys: string[];
}) {
  let {
    dataList,
    getQuery,
    getItem,
    getPrismaItemList,
    prismaItemToCreateDto,
    requiredKeys,
  } = param;
  if (!requiredKeys) {
    requiredKeys = [];
  }
  if (!getPrismaItemList) {
    getPrismaItemList = null;
  }
  if (!prismaItemToCreateDto) {
    prismaItemToCreateDto = null;
  }

  const getKey = (item: any) => item._id as number;
  const checkKey = (key: any) => {
    if (key === null || key === undefined) {
      throw new Error(`Key ${key} is missing`);
    }
  };
  const checkItemRequireKeys = (item: any) => {
    for (const key of requiredKeys) {
      if (item[key] === null || item[key] === undefined) {
        throw new Error(
          `Required key ${key} is missing. Keys: ${JSON.stringify(item)}`,
        );
      }
    }
  };

  const listWithIdMap: any = {};
  const notFoundList: any[] = [];
  let maxIdList = 0;
  let prismaItemList: any[] = [];
  if (getPrismaItemList) {
    prismaItemList =
      (await getPrismaItemList()).map((item) => ({
        ...item,
        id: undefined,
      })) || [];
  }
  // console.log(prismaItemList);

  for (const data of dataList) {
    const query = await getQuery(data);
    const item = await getItem(data, query);

    if (item) {
      const key = await getKey(item);
      const foundKeyFlag = key !== null && key !== undefined;
      if (foundKeyFlag) {
        checkItemRequireKeys(item.data);
        prismaItemList = prismaItemList.filter((item) => item.id !== key);
        listWithIdMap[key] = item.data;
        maxIdList = Math.max(maxIdList, key);
      } else {
        notFoundList.push(item.data);
      }
    } else {
      notFoundList.push(data);
    }
  }
  if (prismaItemToCreateDto) {
    for (const item of prismaItemList) {
      const dto = await prismaItemToCreateDto(item);
      checkItemRequireKeys(dto);
      notFoundList.push(dto);
    }
  }

  if (notFoundList.length > 0) {
    for (const data of notFoundList) {
      const key = ++maxIdList;
      checkKey(key);
      checkItemRequireKeys(data);
      listWithIdMap[key] = data;
    }
  }
  return listWithIdMap;
}

async function main() {
  const categories = ['猫カフェ'];

  const userListWithIdMap = await getListWithIdMap({
    dataList: users,
    getQuery: (user) => ({ email: user.email }),
    getItem: async (user, query) => {
      const data = await prisma.users.findFirst({
        where: query,
      });
      return {
        data: user,
        _id: data?.id,
      };
    },
    getPrismaItemList: async () => await prisma.users.findMany(),
    prismaItemToCreateDto: async (item) => ({
      email: item.email,
      password: item.password,
      username: item.username,
      phone_number: item.phone_number,
      date_of_birth: item.date_of_birth,
      image_url: item.image_url,
      role: item.role,
    }),
    requiredKeys: [
      'email',
      'password',
      'username',
      'phone_number',
      'date_of_birth',
      'image_url',
      'role',
    ],
  });

  const coffeeShopSelectOption = {
    id: true,
    name: true,
    images: true,
    owner_ID: true,
    closing_at: true,
    opening_at: true,
    description: true,
    phone_number: true,
    status: true,
    address: true,
    verified: true,
    crowded_hours: true,
    coffee_shop_devices: {
      select: {
        device: {
          select: {
            name: true,
          },
        },
        quantity: true,
        status: true,
      },
    },
    coffee_shop_categories: {
      select: {
        category: {
          select: {
            name: true,
          },
        },
      },
    },
  };
  const coffeeShopListWithIdMap = await getListWithIdMap({
    dataList: coffeeShops,
    getQuery: (coffeeShop) => ({ name: coffeeShop.name }),
    getItem: async (coffeeShop, query) => {
      const data = await prisma.coffee_shops.findFirst({
        where: query,
        select: coffeeShopSelectOption,
      });
      return {
        data: coffeeShop,
        _id: data?.id,
      };
    },
    getPrismaItemList: async () =>
      await prisma.coffee_shops.findMany({
        select: coffeeShopSelectOption,
      }),
    prismaItemToCreateDto: async (item) => ({
      name: item.name,
      images: item.images,
      owner_ID: item.owner_ID,
      opening_at: item.opening_at,
      closing_at: item.closing_at,
      description: item.description,
      phone_number: item.phone_number,
      status: item.status,
      address: item.address,
      verified: item.verified,
      crowded_hours: Array.isArray(item.crowded_hours[0])
        ? item.crowded_hours
        : [item.crowded_hours.slice(0, 23), item.crowded_hours.slice(24, 47)],
      devices:
        item.device ||
        item.devices ||
        item.coffee_shop_devices.map((item) => ({
          name: item.device.name,
          quantity: item.quantity,
          status: item.status,
        })),
      categories:
        item.category ||
        item.categories ||
        item.coffee_shop_categories.map((item) => item.category.name),
    }),
    requiredKeys: [
      'name',
      'images',
      'owner_ID',
      'opening_at',
      'closing_at',
      'description',
      'phone_number',
      'status',
      'address',
      'verified',
      'crowded_hours',
      'devices',
      'categories',
    ],
  });

  // const reviewListWithIdMap = await getListWithIdMap({
  //   dataList: reviews,
  //   getQuery: (review) => ({
  //     user_ID: review.user_ID,

  // console.log(coffeeShopListWithIdMap);
  // console.log(Object.keys(userListWithIdMap));

  await writeFile(
    './prisma/data/data-map.json',
    JSON.stringify({
      users: userListWithIdMap,
      coffee_shops: coffeeShopListWithIdMap,
    }),
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );

  // console.log(coffeeShopListWithId);
  // for (const user of users) {
  //   await prisma.users.create({
  //     data: user,
  //   });
  // }

  // for (let i = 0; i < coffeeShops.length; i++) {
  //   const coffee_shop = coffeeShops[i];
  //   try {
  //     const cfs_create_dto = plainToInstance(
  //       CreateCoffeeShopV2Dto,
  //       coffee_shop,
  //     );
  //     await prisma.coffee_shops.create({
  //       data: cfs_create_dto,
  //     });
  //   } catch (e) {
  //     console.log('Index: ' + i);
  //     console.log(e);
  //   }
  // }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
