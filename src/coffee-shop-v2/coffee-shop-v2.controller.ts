import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';
import { CreateCoffeeShopV2Dto } from './dto/create-coffee-shop-v2.dto';
import { UpdateCoffeeShopV2Dto } from './dto/update-coffee-shop-v2.dto';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryCoffeeShopV2Dto } from './dto/query-coffee-shop.dto';
import { PaginateQueryDto } from '../dto/query-paginate.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  PrismaService,
  connectPrismaMNCreateOne,
  flattenPrismaMNJoinMany,
} from '@src/common';
import { AddDeviceDto } from './dto/add-device.dto';
import { CoffeeShopV2Entity } from './entities/coffee-shop-v2.entity';

@ApiTags('coffee-shops-v2')
// @ApiHeader({
//   name: 'X-MyHeader',
//   description: 'Custom header',
// })
@Controller({ version: '2', path: 'coffee_shop' })
export class CoffeeShopV2Controller {
  constructor(
    private readonly coffeeShopV2Service: CoffeeShopV2Service,
    private readonly prismaService: PrismaService,
  ) {}

  @ApiOperation({
    summary: 'Create a coffee shop',
    description: `
    Create a coffee shop:
    - Request body:
      - common fields: name, business_hours, description, phone_number, status, address, verified
      - categories: string[] (optional) - only create if the category exists else return error
      - TODO: create with devices
    - Response body: CoffeeShop
    `,
  })
  @ApiResponse({
    status: 201,
    type: CoffeeShopV2Entity,
  })
  @Post()
  async create(@Body() createCoffeeShopV2Dto: CreateCoffeeShopV2Dto) {
    const createObj = createCoffeeShopV2Dto;

    if (createObj.categories) {
      const additional = await connectPrismaMNCreateOne(
        this.prismaService,
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
        this.prismaService,
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

    return await this.prismaService.coffee_shops.create({
      data: createObj,
    });
  }

  @ApiOperation({
    summary: 'Find coffee shop list',
    description: `
    - Request query:
      - name: if not provided, return all, else return all that match the name (contains)
      - categories: string[] (optional) - only create if the category exists else return error
    - Response body:
      - data: list of record
      - pageSize: number of record per page
      - page: current page
    `,
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CoffeeShopV2Entity,
  })
  @Get()
  async findMany(
    @Query() attrQuery: QueryCoffeeShopV2Dto,
    @Query() paginate: PaginateQueryDto,
  ) {
    const useCateFilter = !!attrQuery.categories;
    const useDevFilter = !!attrQuery.devices;

    console.log('attrQuery.categories');
    console.log(attrQuery.categories);

    const cate_name_list =
      typeof attrQuery.categories === 'string'
        ? [attrQuery.categories]
        : attrQuery.categories || [];
    const dev_name_list =
      typeof attrQuery.devices === 'string'
        ? [attrQuery.devices]
        : attrQuery.devices || [];

    const shopList: any[] = await this.prismaService.$queryRaw`
      SELECT "coffee_shop_ID" as "id", "name", "business_hours", "description", "phone_number", "status", "address", "verified"
      FROM
        "coffee_shops"
      WHERE
        ("coffee_shops"."coffee_shop_ID"
          in (
            SELECT "coffee_shop_ID" as "id" FROM (
              SELECT "coffee_shop_ID", string_agg("categories"."name", ',') as "cate_names"
              FROM (  SELECT * FROM "categories"
                      RIGHT JOIN "coffee_shop_categories" ON "categories"."category_ID" = "coffee_shop_categories"."category_ID"
                      ORDER BY "name"
                    ) as "categories"
              WHERE "categories"."name" IN (${
                cate_name_list.length ? Prisma.join(cate_name_list) : 'test'
              } )
              GROUP BY "coffee_shop_ID"
            ) AS B
            WHERE "cate_names" = ${cate_name_list.sort().join(',')}
          )
        or ${!useCateFilter})
        AND
        ("coffee_shops"."coffee_shop_ID"
          in (
            SELECT "coffee_shop_ID" as "id" FROM (
              SELECT "coffee_shop_ID", string_agg("devices"."name", ',') as "cate_names"
              FROM (  SELECT * FROM "devices"
                      RIGHT JOIN "coffee_shop_devices" ON "devices"."device_ID" = "coffee_shop_devices"."device_ID"
                      ORDER BY "name"
                    ) as "devices"
              WHERE "devices"."name" IN (${
                dev_name_list.length ? Prisma.join(dev_name_list) : 'test'
              })
              GROUP BY "coffee_shop_ID"
            ) AS B
            WHERE "cate_names" = ${dev_name_list.sort().join(',')}
          )
        or ${!useDevFilter})
        AND ("coffee_shops"."name" LIKE ${
          attrQuery.name ? '%' + attrQuery.name + '%' : '%'
        })
        AND ("coffee_shops"."business_hours" LIKE ${
          attrQuery.business_hours || '%'
        })
      LIMIT ${paginate.toQuery().pageSize}
      OFFSET ${paginate.toQuery().pageSize * (paginate.toQuery().page - 1)}
      `;

    const shopListNested = await Promise.all(
      shopList.map(async (s) => {
        const devices = await this.prismaService.coffee_shop_devices.findMany({
          where: {
            coffee_shop_ID: s.id,
          },
          include: {
            device: true,
          },
        });
        const categories =
          await this.prismaService.coffee_shop_categories.findMany({
            where: {
              coffee_shop_ID: s.id,
            },
            include: {
              category: true,
            },
          });
        let user = null;
        if (s.owner_ID)
          user = await this.prismaService.users.findFirst({
            where: {
              id: {
                equals: s.owner_ID,
              },
            },
          });

        const review_agg = await this.prismaService.reviews.aggregate({
          _avg: {
            star: true,
          },
          _count: {
            star: true,
          },
          where: {
            coffee_shop_ID: s.id,
          },
        });
        return {
          ...s,
          coffee_shop_devices: devices,
          coffee_shop_categories: categories,
          owner: user,
          review: {
            star: review_agg._avg.star || 0, // NOTE: Default star is 0 if no review
            count: review_agg._count.star,
          },
        };
      }),
    );

    return {
      data: await this.coffeeShopV2Service.transformPrismaNestedJoinToEntityList(
        shopListNested,
      ),
      ...paginate.toQuery(),
    };
  }

  @ApiOperation({
    summary: 'Find coffee shop by id',
  })
  @ApiResponse({
    status: 200,
    type: CoffeeShopV2Entity,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const match = await this.coffeeShopV2Service.findOne(id, { crudQuery: {} });

    if (!match) throw new NotFoundException(`Coffee shop ${id} not found`);
    const review_agg = await this.prismaService.reviews.aggregate({
      _avg: {
        star: true,
      },
      _count: {
        star: true,
      },
      where: {
        coffee_shop_ID: match.id,
      },
    });

    return this.coffeeShopV2Service.transformPrismaNestedJoinToEntity({
      ...match,
      review: {
        star: review_agg._avg.star || 0, // NOTE: Default star is 0 if no review
        count: review_agg._count.star,
      },
    });
  }

  @ApiOperation({
    summary: 'Update coffee shop (include set categories and devices)',
  })
  @ApiNotFoundResponse({
    description: 'Coffee shop not found',
  })
  @ApiNotFoundResponse({
    description: 'Categories not found',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCoffeeShopV2Dto: UpdateCoffeeShopV2Dto,
  ) {
    if (updateCoffeeShopV2Dto.categories) {
      this.coffeeShopV2Service.setCategories(id, {
        categories: updateCoffeeShopV2Dto.categories,
      });
      delete updateCoffeeShopV2Dto.categories;
    }

    if (updateCoffeeShopV2Dto.devices) {
      this.coffeeShopV2Service.setDevices(id, {
        devices: updateCoffeeShopV2Dto.devices,
      });
      delete updateCoffeeShopV2Dto.devices;
    }

    const updated = await this.coffeeShopV2Service.update(
      id,
      updateCoffeeShopV2Dto,
      { crudQuery: {} },
    );
    return updated;
  }

  @ApiOperation({
    summary: 'Delete coffee shop',
    description:
      'Also delete all related records in coffee_shop_categories, coffee_shop_devices, bookmarks, images, reviews',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.coffeeShopV2Service.remove(id, { crudQuery: {} });
  }
}
