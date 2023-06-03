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
} from '@nestjs/common';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';
import { CreateCoffeeShopV2Dto } from './dto/create-coffee-shop-v2.dto';
import { UpdateCoffeeShopV2Dto } from './dto/update-coffee-shop-v2.dto';
import { ApiHeader, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { QueryCoffeeShopV2Dto } from './dto/query-coffee-shop.dto';
import { PaginateQueryDto } from '../dto/query-paginate.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  PrismaService,
  connectPrismaMNCreateOne,
  flattenPrismaMNJoinMany,
} from '@src/common';

// version 2
@ApiTags('Coffee Shop v2')
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

  // @ApiProperty({
  // })
  @ApiOperation({
    summary: 'Create a coffee shop',
    description: `
    Create a coffee shop:
    - Request body:
      - common fields: name, business_hours, description, phone_number, status, address, verified
      - categories: string[] (optional) - only create if the category exists else return error
    - Response body: CoffeeShop
    `,
  })
  @Post()
  async create(
    @Body() createCoffeeShopV2Dto: CreateCoffeeShopV2Dto,
    // @Query('crudQuery') crudQuery: string,
  ) {
    const createObj = createCoffeeShopV2Dto;

    if (createObj.categories !== undefined) {
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
      console.log(additional['coffee_shop_categories'].createMany.data);
    }

    return await this.prismaService.coffee_shops.create({
      data: createObj,
    });
  }

  @Get()
  async findMany(
    @Query() attrQuery: QueryCoffeeShopV2Dto,
    @Query() paginate: PaginateQueryDto,
  ) {
    const useCateFilter = !!attrQuery.categories;
    const useDevFilter = !!attrQuery.devices;
    const cate_name_list = attrQuery.categories || [];
    const dev_name_list = attrQuery.devices || [];

    const shopList: any[] = await this.prismaService.$queryRaw`
      SELECT "coffee_shop_ID", "name", "business_hours", "description", "phone_number", "status", "address", "verified"
      FROM
        "coffee_shops"
      WHERE
        -- ("coffee_shops"."coffee_shop_ID" = "C"."id" or ${!useCateFilter})
        ("coffee_shops"."coffee_shop_ID"
          in (
            SELECT "coffee_shop_ID" as "id" FROM (
              SELECT "coffee_shop_ID", string_agg("categories"."name", ',') as "cate_names"
              FROM (  SELECT * FROM "categories"
                      RIGHT JOIN "coffee_shop_categories" ON "categories"."category_ID" = "coffee_shop_categories"."category_ID"
                      ORDER BY "name"
                    ) as "categories"
              WHERE "categories"."name" IN (${Prisma.join(
                cate_name_list || ['test'],
              )})
              GROUP BY "coffee_shop_ID"
            ) AS B
            WHERE "cate_names" = ${(cate_name_list || ['test'])
              .sort()
              .join(',')}
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
            WHERE "cate_names" = ${(dev_name_list || ['test']).sort().join(',')}
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
            coffee_shop_ID: s.coffee_shop_ID,
          },
          include: {
            device: true,
          },
        });
        const categories =
          await this.prismaService.coffee_shop_categories.findMany({
            where: {
              coffee_shop_ID: s.coffee_shop_ID,
            },
            include: {
              category: true,
            },
          });

        return {
          ...s,
          coffee_shop_devices: devices,
          coffee_shop_categories: categories,
        };
      }),
    );

    const result = flattenPrismaMNJoinMany(
      shopListNested,
      'coffee_shop_categories',
      'category',
      [],
    );

    return {
      data: result,
      ...paginate.toQuery(),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    // @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.coffeeShopV2Service.findOne(id, { crudQuery: {} });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCoffeeShopV2Dto: UpdateCoffeeShopV2Dto,
    // @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.coffeeShopV2Service.update(
      id,
      updateCoffeeShopV2Dto,
      { crudQuery: {} },
    );
    return updated;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    // @Query('crudQuery') crudQuery: string
  ) {
    return this.coffeeShopV2Service.remove(id, { crudQuery: {} });
  }
}
