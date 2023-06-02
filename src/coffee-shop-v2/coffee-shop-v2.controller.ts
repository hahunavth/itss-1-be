import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';
import { CreateCoffeeShopV2Dto } from './dto/create-coffee-shop-v2.dto';
import { UpdateCoffeeShopV2Dto } from './dto/update-coffee-shop-v2.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { QueryCoffeeShopV2Dto } from './dto/query-coffee-shop.dto';

// version 2
@ApiTags('Coffee Shop v2')
@Controller({ version: '2', path: 'coffee_shop' })
export class CoffeeShopV2Controller {
  constructor(private readonly coffeeShopV2Service: CoffeeShopV2Service) {}

  @ApiProperty({})
  @Post()
  async create(
    @Body() createCoffeeShopV2Dto: CreateCoffeeShopV2Dto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.coffeeShopV2Service.create(
      createCoffeeShopV2Dto,
      { crudQuery },
    );
    return created;
  }

  @Get()
  async findMany(@Query() crudQuery: QueryCoffeeShopV2Dto) {
    console.log(crudQuery);
    const matches = await this.coffeeShopV2Service.findMany({
      crudQuery: crudQuery.toQuery(),
    });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.coffeeShopV2Service.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeShopV2Dto: UpdateCoffeeShopV2Dto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.coffeeShopV2Service.update(
      id,
      updateCoffeeShopV2Dto,
      { crudQuery },
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.coffeeShopV2Service.remove(id, { crudQuery });
  }
}
