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
import { Prisma, PrismaClient, coffee_shops } from '@prisma/client';
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
      - devices: - only create if the device exists else return error
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
    summary:
      'Sprint 2 - Task 6, 8: Find coffee shop list; Sprint 3 - find name and address)',
    // description: `
    // - Request query:
    //   - name: if not provided, return all, else return all that match the name (contains)
    //   - categories: string[] (optional) - only create if the category exists else return error
    // - Response body:
    //   - data: list of record
    //   - pageSize: number of record per page
    //   - page: current page
    // `,
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

    const cate_name_list =
      typeof attrQuery.categories === 'string'
        ? [attrQuery.categories]
        : attrQuery.categories || [];
    const dev_name_list =
      typeof attrQuery.devices === 'string'
        ? [attrQuery.devices]
        : attrQuery.devices || [];
    const orderBy = `${attrQuery.orderBy}`;
    const orderType = attrQuery.orderType;
    const day = attrQuery.now || new Date(Date.now());
    const dayId = day.getDate() === 0 ? 1 : 0;
    const hourId = dayId * 24 + day.getHours();
    // console.log(attrQuery.now);

    // const orderByClause =
    //   orderBy === 'crowded'
    //     ? orderType.toUpperCase() === 'ASC'
    //       ? Prisma.sql`ORDER BY array_position("crowded_hours", ${hourId}) ASC`
    //       : Prisma.sql`ORDER BY array_position("crowded_hours", ${hourId}) DESC`
    //     : orderType.toUpperCase() === 'ASC'
    //     ? Prisma.sql`
    //      ORDER BY ${orderBy} ASC
    //       `
    //     : Prisma.sql`
    //      ORDER BY ${orderBy} DESC
    //      `;
    let orderByClause = null;
    switch (orderBy) {
      case 'crowded':
        orderByClause =
          orderType.toUpperCase() === 'ASC'
            ? Prisma.sql`ORDER BY array_position("crowded_hours", ${hourId}) ASC`
            : Prisma.sql`ORDER BY array_position("crowded_hours", ${hourId}) DESC`;
        break;
      case 'avg_star':
        orderByClause =
          orderType.toUpperCase() === 'ASC'
            ? Prisma.sql`ORDER BY "avg_star" ASC`
            : Prisma.sql`ORDER BY "avg_star" DESC`;
        break;
      case 'review_count':
        orderByClause =
          orderType.toUpperCase() === 'ASC'
            ? Prisma.sql`ORDER BY "review_count" ASC`
            : Prisma.sql`ORDER BY "review_count" DESC`;
        break;
      case 'name':
        orderByClause =
          orderType.toUpperCase() === 'ASC'
            ? Prisma.sql`ORDER BY "name" ASC`
            : Prisma.sql`ORDER BY "name" DESC`;
        break;
      case 'status':
        orderByClause =
          orderType.toUpperCase() === 'ASC'
            ? Prisma.sql`ORDER BY "status" ASC`
            : Prisma.sql`ORDER BY "status" DESC`;
        break;
      case 'id':
        orderByClause =
          orderType.toUpperCase() === 'ASC'
            ? Prisma.sql`ORDER BY "coffee_shop_ID" ASC`
            : Prisma.sql`ORDER BY "coffee_shop_ID" DESC`;
        break;
      case null:
        orderByClause = Prisma.empty;
        break;
      default:
        throw new BadRequestException('Invalid orderBy');
    }
    const userId = attrQuery.user_ID;

    let whereBookmarkedClause = null;
    switch (attrQuery.bookmark_type) {
      case 'bookmarked':
        if (userId === undefined) {
          throw new BadRequestException(
            'Require user_ID to get bookmarked list',
          );
        }
        whereBookmarkedClause = Prisma.sql`
            AND (
              select count(*) from "bookmarks" where "bookmarks"."coffee_shop_ID" = "coffee_shops"."coffee_shop_ID" and "bookmarks"."user_ID" = ${userId}
            ) = 1`;
        break;
      case 'not_bookmarked':
        if (userId !== undefined) {
          if (userId === undefined) {
            throw new BadRequestException(
              'Require user_ID to get not_bookmarked list',
            );
          }
          whereBookmarkedClause = Prisma.sql`
            AND (
              select count(*) from "bookmarks" where "bookmarks"."coffee_shop_ID" = "coffee_shops"."coffee_shop_ID" and "bookmarks"."user_ID" = ${userId}
            ) = 0`;
        }
        break;
      case 'all':
      case null:
      case undefined:
        whereBookmarkedClause = Prisma.empty;
        break;
      default:
        throw new BadRequestException('Invalid bookmark_type');
    }

    console.log(orderByClause);

    const pageSize = paginate.toQuery().pageSize;

    const shopList: any[] = await this.prismaService.$queryRaw`
      SELECT
        "coffee_shop_ID" as "id", "name",
        "images", "owner_ID",
        "opening_at", "closing_at",
        "description", "phone_number", "status", "address", "verified",
        -- to reviews attr
        "review_count", "avg_star",
        "crowded_hours",
        --
        "coffee_shops"."crowded_hours"[${hourId}] as "current_crowded",
        -- to list info
        count(*) OVER()::int AS full_count,
        -- to bookmark attr
        (
          select count(*)::int from "bookmarks" where "bookmarks"."coffee_shop_ID" = "coffee_shops"."coffee_shop_ID" and "bookmarks"."user_ID" = ${userId}
        ) as "bookmarked",
        (
          select count(*)::int from "bookmarks" where "bookmarks"."coffee_shop_ID" = "coffee_shops"."coffee_shop_ID"
        ) as "bookmark_count"
      FROM
        -- SELECT COFFEE SHOP WITH AVG STAR AND REVIEW COUNT
        (
          SELECT
            "coffee_shops".*,
            Coalesce(AVG("reviews"."star"), 0)::float as "avg_star", -- NOTE: AVG RETURN NULL IF NO ROWS -> USE COALESCE TO RETURN 0
            COUNT("reviews"."review_ID")::int as "review_count"    -- NOTE: COUNT RETURN 0 IF NO ROWS; RETURN TYPE IS BIGINT, CAST TO INT
          FROM "coffee_shops"
            LEFT JOIN "reviews" ON "coffee_shops"."coffee_shop_ID" = "reviews"."coffee_shop_ID"
          GROUP BY "coffee_shops"."coffee_shop_ID"
        ) AS "coffee_shops"
      -- WHERE
      WHERE
      -- FILTER BY CATEGORY
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
      --
      AND
      -- FILTER BY DEVICE
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
      --
      -- FILTER BY NAME
      AND (
        ("coffee_shops"."name" ILIKE ${
          attrQuery.name ? `%${attrQuery.name}%` : '%'
        })
        or
        ("coffee_shops"."address" ILIKE ${
          attrQuery.name ? `%${attrQuery.name}%` : '%'
        })
      )
      -- FILTER BY OPENING TIME
      AND ("coffee_shops"."opening_at" <= ${
        attrQuery.opening_at
      } or ${!attrQuery.opening_at})
      -- FILTER BY CLOSING TIME
      AND ("coffee_shops"."closing_at" >= ${
        attrQuery.closing_at
      } or ${!attrQuery.closing_at})
      -- FILTER BY CROWDED
      AND ("coffee_shops"."crowded_hours"[${hourId}] = ${
      attrQuery.crowded_status
    } or ${typeof attrQuery.crowded_status !== 'number'})
    -- BOOKMARKED
    ${whereBookmarkedClause}
        -- ORDER BY
      ${orderByClause}
      -- PAGINATE
      LIMIT ${paginate.toQuery().pageSize}
      OFFSET ${paginate.toQuery().pageSize * (paginate.toQuery().page - 1)}
      ;
      `;

    let totalRecords = 1;
    let pageCount = 1;

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
            select: {
              username: true,
              email: true,
              phone_number: true,
              date_of_birth: true,
              image_url: true,
              role: true,
            },
          });

        s['review'] = {
          star: s.avg_star,
          count: s.review_count,
        };
        delete s['review_count'];
        delete s['avg_star'];

        // if (s['opening_at'])
        s['opening_at'] = `${('0' + s['opening_at'].getUTCHours()).slice(
          -2,
        )}:${('0' + s['opening_at'].getUTCMinutes()).slice(-2)}`;
        s['closing_at'] = `${('0' + s['closing_at'].getUTCHours()).slice(
          -2,
        )}:${('0' + s['closing_at'].getUTCMinutes()).slice(-2)}`;

        // s['current_crowded'] = s['crowded_hours'][hourId];
        s['crowded_hours'] = [
          s['crowded_hours'].slice(0, 23),
          s['crowded_hours'].slice(24, 47),
        ];

        // delete s['crowded_hours'];

        if (s.hasOwnProperty('full_count')) {
          totalRecords = s['full_count'];
          pageCount = Math.ceil(totalRecords / pageSize);
          delete s.full_count;
        }

        return {
          ...s,
          coffee_shop_devices: devices,
          coffee_shop_categories: categories,
          owner: user,
        };
      }),
    );

    return {
      data: await this.coffeeShopV2Service.transformPrismaNestedJoinToEntityList(
        shopListNested,
      ),
      ...paginate.toQuery(),
      totalRecords,
      pageCount,
      __debug: {
        query: attrQuery.toQuery(),
        now: day,
        dayId,
        hourId,
      },
    };
  }

  @ApiOperation({
    summary: 'Sprint 2 - Task 11: Find coffee shop by id',
  })
  @ApiResponse({
    status: 200,
    // type: CoffeeShopV2Entity,
  })
  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Query('now') now?: Date,
    @Query('user_ID') user_ID?: number,
  ) {
    const match = await this.coffeeShopV2Service.findOne(id, {
      crudQuery: {},
    });

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

    const data =
      await this.coffeeShopV2Service.transformPrismaNestedJoinToEntity({
        ...match,
        review: {
          star: review_agg._avg.star || 0, // NOTE: Default star is 0 if no review
          count: review_agg._count.star,
        },
      });

    data['opening_at'] = `${('0' + data['opening_at'].getUTCHours()).slice(
      -2,
    )}:${('0' + data['opening_at'].getUTCMinutes()).slice(-2)}` as any;
    data['closing_at'] = `${('0' + data['closing_at'].getUTCHours()).slice(
      -2,
    )}:${('0' + data['closing_at'].getUTCMinutes()).slice(-2)}` as any;

    data['crowded_hours'] = [
      data['crowded_hours'].slice(0, 23),
      data['crowded_hours'].slice(24, 47),
    ] as any;

    const day = now ? new Date(now) : new Date();
    const dayId = day.getDate() === 0 ? 1 : 0;
    const hourId = day.getHours();
    data['current_crowded'] = data['crowded_hours'][dayId][hourId];
    delete data['crowded_hours'];

    if (user_ID) {
      data['bookmarked'] = (await this.prismaService.bookmarks.findFirst({
        where: {
          user_ID,
          coffee_shop_ID: id,
        },
      }))
        ? 1
        : 0;
    }

    return data;
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

    if (updateCoffeeShopV2Dto.crowded_hours) {
      updateCoffeeShopV2Dto.crowded_hours = {
        set: updateCoffeeShopV2Dto.crowded_hours,
      } as any;
    }

    const updated = await this.prismaService.coffee_shops.update({
      data: updateCoffeeShopV2Dto,
      where: { id },
    });
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
