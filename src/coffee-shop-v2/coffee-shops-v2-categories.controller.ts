import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@src/common';
import { SetCategoriesDto } from './dto/set-categories.dto';

/**
 * @deprecated
 */
@ApiTags('coffee-shops-v2')
@Controller('coffee-shops')
export class CoffeeShopsV2CategoriesController {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOperation({
    summary: 'Set category list of a coffee shop',
  })
  @ApiNotFoundResponse({
    description: 'Coffee shop not found',
  })
  @ApiNotFoundResponse({
    description: 'Categories not found',
  })
  @Put(':id/categories')
  async addCategory(
    @Param('id') coffeeShopId: number,
    @Body() addCategoryDto: SetCategoriesDto,
  ) {
    const categories = addCategoryDto.categories;

    // find coffee shop
    const coffeeShop = await this.prismaService.coffee_shops.findFirst({
      where: {
        id: {
          equals: coffeeShopId,
        },
      },
    });
    if (!coffeeShop) {
      throw new NotFoundException('Coffee shop not found');
    }

    // delete all coffee_shop_categories of this coffee shop
    await this.prismaService.coffee_shop_categories.deleteMany({
      where: {
        coffee_shop_ID: {
          equals: coffeeShopId,
        },
      },
    });

    // find all categories
    const categoryList = await this.prismaService.categories.findMany({
      where: {
        name: {
          in: categories,
        },
      },
    });
    const notExistsCategories = categories.filter(
      (c) => !categoryList.find((cl) => cl.name === c),
    );
    if (notExistsCategories.length > 0) {
      throw new BadRequestException(
        `Categories not found: ${notExistsCategories.join(', ')}`,
      );
      // // create
      // const newCategories = await Promise.all(
      //   notExistsCategories.map(async (c) => {
      //     return await this.prismaService.categories.create({
      //       data: {
      //         name: c,
      //       },
      //     });
      //   }),
      // );
      // categoryList.push(...newCategories);
    }

    // create new coffee_shop_categories
    const newCoffeeShopCategories = await Promise.all(
      categoryList.map(async (c) => {
        return await this.prismaService.coffee_shop_categories.create({
          data: {
            coffee_shop_ID: coffeeShopId,
            category_ID: c.id,
          },
        });
      }),
    );

    return newCoffeeShopCategories;
  }
}
