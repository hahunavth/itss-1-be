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
  const names = [
    'images',
    'coffee_shops',
    'users',
    'reviews',
    'bookmarks',
    'categories',
    'devices',
    'coffee_shop_categories',
    'coffee_shop_devices',
  ];
  // const modelNames = Prisma.dmmf.datamodel.models.map((model) =>
  //   console.log(model.name),
  // );

  return Promise.all(
    names.map((modelName) => prisma[modelName.toLowerCase()].deleteMany()),
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
  await cleanupDatabase();
  // console.log(reviews.length);
  // // random sort
  // const reviewsRandom = reviews.sort(() => Math.random() - 0.5);
  // // split into 4 cluster with 1/4
  // const reviewsCluster = [
  //   reviewsRandom.slice(0, reviews.length / 4),
  //   reviewsRandom.slice(reviews.length / 4, reviews.length / 2),
  //   reviewsRandom.slice(reviews.length / 2, (reviews.length / 4) * 3),
  //   reviewsRandom.slice((reviews.length / 4) * 3, reviews.length),
  // ];
  // for (const cluster in reviewsCluster) {
  //   // save to file json
  //   await writeFile(
  //     `./rv-cluster${cluster}.json`,
  //     JSON.stringify(reviewsCluster[cluster]),
  //     (err) => console.log(err),
  //   );
  // }
  // seed begin

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
  // create default user with id = 4
  if (await prisma.users.findUnique({ where: { id: 4 } })) {
    console.log('User with id = 4 already exists. Skip seeding.');
  } else {
    const createdUser = await prisma.users.create({
      data: {
        id: 4,
        username: 'default',
        email: 'default@gmail.com',
        password: '123456789',
        phone_number: '0987656789',
        date_of_birth: '2023-07-10T06:22:12.302Z',
        image_url:
          'https://i1.sndcdn.com/artworks-000638979814-37elk9-t500x500.jpg',
        role: 0,
        nationality: '日本',
      },
    });
    console.log('Created user: ', createdUser);
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
