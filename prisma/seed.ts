import { CreateCoffeeShopV2Dto } from './../src/coffee-shop-v2/dto/create-coffee-shop-v2.dto';
import { PrismaClient, coffee_shops, Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { writeFile } from 'fs';
import { coffeeShops, users, reviews } from './data';
import { isArray } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { randomInt } from 'crypto';

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

export const cleanupDatabase = () => {
  console.log('Cleanup database');
  const prisma = new PrismaClient();
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

  return Promise.all(
    modelNames.map((modelName) => prisma[modelName.toLowerCase()].deleteMany()),
  );
};

let i = 0;
const crowded1to2D = (crowdedHours: number[]) => {
  i++;
  if (crowdedHours.length !== 48) {
    throw new Error('crowdedHours length must be 48');
  }

  const crowdedHours2D = [
    crowdedHours.slice(0, 24),
    crowdedHours.slice(24, 48),
  ];

  return crowdedHours2D;
};

const crewded2to1D = (crowdedHours2D: number[][]) => {
  if (crowdedHours2D.length !== 2) {
    throw new Error('crowdedHours2D length must be 2');
  }

  const crowdedHours = [...crowdedHours2D[0], ...crowdedHours2D[1]];
  if (crowdedHours.length !== 48) {
    console.log(crowdedHours);
    throw new Error(
      `crowdedHours length must be 48 but got ${crowdedHours.length} at item ${i}`,
    );
  }

  return crowdedHours;
};

export async function connectPrismaMNCreateOne(
  prismaService: any,
  relationName: string,
  targetTable: string,
  targetValues: (string | number)[],
  targetFindKey: string,
  targetCreateIntermediateTableKey: string,
  targetCreateTargetTableKey: string,
  additionalIntermediateData?: any[],
) {
  const rc = await prismaService[targetTable].findMany({
    where: {
      [targetFindKey]: {
        in: targetValues,
      },
    },
  });

  if (rc.length !== targetValues.length) {
    const newValues = targetValues.filter(
      (v) => !rc.map((r) => r[targetFindKey]).includes(v),
    );

    throw new BadRequestException(
      'Not found ' + targetTable + ': ' + newValues.join(', '),
    );
  }

  const rc2 = [];
  if (additionalIntermediateData && additionalIntermediateData.length > 0) {
    if (additionalIntermediateData.length !== targetValues.length) {
      throw new BadRequestException(
        'additionalIntermediateData length must be equal to targetValues length',
      );
    }
    for (let i = 0; i < rc.length; i++) {
      rc2.push({
        [targetCreateIntermediateTableKey]: rc[i][targetCreateTargetTableKey],
        ...additionalIntermediateData[i],
      });
    }
  } else {
    for (let i = 0; i < rc.length; i++) {
      rc2.push({
        [targetCreateIntermediateTableKey]: rc[i][targetCreateTargetTableKey],
      });
    }
  }

  const additional = {
    [relationName]: {
      createMany: {
        data: rc2,
        // rc.map((r) => ({
        //   [targetCreateIntermediateTableKey]: r[targetCreateTargetTableKey],
        // })),
      },
    },
  };

  return additional;
}

async function main() {
  // delete all
  // await cleanupDatabase();

  const categories = [
    { name: 'カフェ', description: '' },
    { name: '猫カフェ', description: '' },
    { name: '喫茶店', description: '' },
  ];
  const devices = [
    'Wi-Fi',
    'コンセント',
    '駐車場',
    '禁煙席',
    '喫煙席',
    'エアコン',
  ];

  if ((await prisma.categories.count()) === 0) {
    const createdCategories = await prisma.categories.createMany({
      data: categories,
    });
    console.log('Created categories: ', createdCategories);
  } else {
    console.log('Categories already exists. Skip seeding.');
  }

  if ((await prisma.devices.count()) === 0) {
    const createdDevices = await prisma.devices.createMany({
      data: devices.map((name) => ({ name })),
    });
    console.log('Created devices: ', createdDevices);
  } else {
    console.log('Devices already exists. Skip seeding.');
  }

  if ((await prisma.users.count()) === 0) {
    const createdUsers = await prisma.users.createMany({
      data: users,
    });
    console.log('Created users: ', createdUsers);
  } else {
    console.log('Users already exists. Skip seeding.');
  }

  const userIdList = await prisma.users.findMany({
    select: {
      id: true,
    },
  });

  if ((await prisma.coffee_shops.count()) === 0) {
    const createCFDtoLst = await Promise.all(
      coffeeShops.map(async (coffeeShop) => {
        const createObj = plainToInstance(CreateCoffeeShopV2Dto, coffeeShop);

        // const createObj = createCoffeeShopV2Dto;

        if (createObj.categories) {
          const additional = await connectPrismaMNCreateOne(
            prisma,
            'coffee_shop_categories',
            'categories',
            createObj.categories,
            'name',
            'category_ID',
            'id',
          );
          delete createObj.categories;
          createObj['coffee_shop_categories'] =
            additional['coffee_shop_categories'];
        }

        if (createObj.devices) {
          const additional = await connectPrismaMNCreateOne(
            prisma,
            'coffee_shop_devices',
            'devices',
            createObj.devices.map((d) => d.name),
            'name',
            'device_ID',
            'id',
            createObj.devices.map((d) => ({
              quantity: d.quantity,
              status: d.status,
            })),
          );
          delete createObj.devices;
          createObj['coffee_shop_devices'] = additional['coffee_shop_devices'];
        }

        return createObj;
      }),
    );
    let i = 0;
    for (const cf of createCFDtoLst) {
      const rcf = {
        ...cf,
        owner_ID: userIdList[cf.owner_ID % userIdList.length].id,
      };
      await prisma.coffee_shops.create({
        data: rcf,
      });
      i++;
    }
    console.log('Created coffeeShops: ', { count: i });
  } else {
    console.log('CoffeeShops already exists. Skip seeding.');
  }

  const cfIdList = await prisma.coffee_shops.findMany({
    select: {
      id: true,
    },
  });

  if ((await prisma.reviews.count()) === 0) {
    const _transformCreateImageAttr = (
      imgs: string[],
      coffee_shop_ID: number,
    ) => {
      return {
        createMany: {
          skipDuplicates: true,
          data: imgs.map((url) => ({
            image_url: url,
            coffee_shop_ID: coffee_shop_ID,
          })),
        },
      };
    };
    const createReviewDtoLst = await Promise.all(
      reviews.map(async (review) => {
        const cfid = cfIdList[review.coffee_shop_ID % cfIdList.length].id;
        return {
          ...review,
          coffee_shop_ID: cfid,
          user_ID: userIdList[randomInt(1000) % userIdList.length].id,
          images: _transformCreateImageAttr(review.images, cfid),
        };
      }),
    );
    let i = 0;
    for (const r of createReviewDtoLst) {
      await prisma.reviews.create({
        data: r,
      });
      i++;
    }
    console.log('Created reviews: ', { count: i });
  } else {
    console.log('Reviews already exists. Skip seeding.');
  }

  // prisma.$connect();
  // console.log(await prisma.bookmarks.findMany());
  // const userListWithIdMap = await getListWithIdMap({
  //   dataList: users,
  //   getQuery: (user) => ({ email: user.email }),
  //   getItem: async (user, query) => {
  //     const data = await prisma.users.findFirst({
  //       where: query,
  //     });
  //     return {
  //       data: user,
  //       _id: data?.id,
  //     };
  //   },
  //   getPrismaItemList: async () => await prisma.users.findMany(),
  //   prismaItemToCreateDto: async (item) => ({
  //     email: item.email,
  //     password: item.password,
  //     username: item.username,
  //     phone_number: item.phone_number,
  //     date_of_birth: item.date_of_birth,
  //     image_url: item.image_url,
  //     role: item.role,
  //   }),
  //   requiredKeys: [
  //     'email',
  //     'password',
  //     'username',
  //     'phone_number',
  //     'date_of_birth',
  //     'image_url',
  //     'role',
  //   ],
  // });
  // const coffeeShopSelectOption = {
  //   id: true,
  //   name: true,
  //   images: true,
  //   owner_ID: true,
  //   closing_at: true,
  //   opening_at: true,
  //   description: true,
  //   phone_number: true,
  //   status: true,
  //   address: true,
  //   verified: true,
  //   crowded_hours: true,
  //   coffee_shop_devices: {
  //     select: {
  //       device: {
  //         select: {
  //           name: true,
  //         },
  //       },
  //       quantity: true,
  //       status: true,
  //     },
  //   },
  //   coffee_shop_categories: {
  //     select: {
  //       category: {
  //         select: {
  //           name: true,
  //         },
  //       },
  //     },
  //   },
  // };
  // const coffeeShopListWithIdMap = await getListWithIdMap({
  //   dataList: coffeeShops,
  //   getQuery: (coffeeShop) => ({ name: coffeeShop.name }),
  //   getItem: async (coffeeShop, query) => {
  //     const data = await prisma.coffee_shops.findFirst({
  //       where: query,
  //       select: coffeeShopSelectOption,
  //     });
  //     return {
  //       data: coffeeShop,
  //       _id: data?.id,
  //     };
  //   },
  //   getPrismaItemList: async () =>
  //     await prisma.coffee_shops.findMany({
  //       select: coffeeShopSelectOption,
  //     }),
  //   prismaItemToCreateDto: async (item) => ({
  //     name: item.name,
  //     images: item.images,
  //     owner_ID: item.owner_ID,
  //     opening_at: item.opening_at,
  //     closing_at: item.closing_at,
  //     description: item.description,
  //     phone_number: item.phone_number,
  //     status: item.status,
  //     address: item.address,
  //     verified: item.verified,
  //     crowded_hours: Array.isArray(item.crowded_hours[0])
  //       ? item.crowded_hours
  //       : [item.crowded_hours.slice(0, 23), item.crowded_hours.slice(24, 47)],
  //     devices:
  //       item.device ||
  //       item.devices ||
  //       item.coffee_shop_devices.map((item) => ({
  //         name: item.device.name,
  //         quantity: item.quantity,
  //         status: item.status,
  //       })),
  //     categories:
  //       item.category ||
  //       item.categories ||
  //       item.coffee_shop_categories.map((item) => item.category.name),
  //   }),
  //   requiredKeys: [
  //     'name',
  //     'images',
  //     'owner_ID',
  //     'opening_at',
  //     'closing_at',
  //     'description',
  //     'phone_number',
  //     'status',
  //     'address',
  //     'verified',
  //     'crowded_hours',
  //     'devices',
  //     'categories',
  //   ],
  // });
  // const reviewListWithIdMap = await getListWithIdMap({
  //   dataList: reviews,
  //   getQuery: (review) => ({
  //     user_ID: review.user_ID,
  // console.log(coffeeShopListWithIdMap);
  // console.log(Object.keys(userListWithIdMap));
  // await writeFile(
  //   './prisma/data/data-map.json',
  //   JSON.stringify({
  //     users: userListWithIdMap,
  //     coffee_shops: coffeeShopListWithIdMap,
  //   }),
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   },
  // );
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
