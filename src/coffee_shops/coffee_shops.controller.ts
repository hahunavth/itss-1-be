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
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { TimeQT } from './dto/timeqt.dto';

@ApiTags('Coffee Shop (deprecated)')
@Controller({ path: 'coffee-shops', version: '1' })
export class CoffeeShopController {
  constructor(
    private readonly service: CoffeeShopService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ deprecated: true })
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
  @ApiOperation({ deprecated: true })
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.service.create(createCoffeeShopDto);
  }

  @Get(':id')
  @ApiOperation({ deprecated: true })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ deprecated: true })
  update(
    @Param('id') id: string,
    @Body() updateCoffeeShopDto: UpdateCoffeeShopDto,
  ) {
    return this.service.update(+id, updateCoffeeShopDto);
  }

  @Delete(':id')
  @ApiOperation({ deprecated: true })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
