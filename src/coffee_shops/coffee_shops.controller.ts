import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeeShopService } from './coffee_shops.service';
import {
  ApiGetAllQuery,
  PaginateQuery,
  PaginateReqQueryT,
  TimeQuery,
  AttrQuery,
  TimeQueryT,
} from '@app/prisma-crud';
import {
  AttrQueryCoffeeShopDto,
  CreateCoffeeShopDto,
  UpdateCoffeeShopDto,
} from './dto';
import { PrismaService } from '@src/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeQT } from './dto/timeqt.dto';

@ApiTags('Coffee Shop')
@Controller('coffee_shop')
export class CoffeeShopController {
  constructor(
    private readonly service: CoffeeShopService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @ApiGetAllQuery(AttrQueryCoffeeShopDto, { filter: true })
  async findAll(
    @PaginateQuery() paginate: PaginateReqQueryT,
    @TimeQuery() timeQuery,
    @Query() attrQuery: AttrQueryCoffeeShopDto,
  ) {
    console.log(attrQuery);
    return this.service.findAll(paginate, timeQuery, attrQuery);
  }

  @Post()
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.service.create(createCoffeeShopDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoffeeShopDto: UpdateCoffeeShopDto,
  ) {
    return this.service.update(+id, updateCoffeeShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
