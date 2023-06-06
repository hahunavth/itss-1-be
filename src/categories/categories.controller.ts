import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@src/common';
import { SetCategoriesDto } from '../coffee-shop-v2/dto/set-categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const created = await this.categoriesService.create(createCategoryDto, {
      crudQuery: {},
    });
    return created;
  }

  @Get()
  async findMany() {
    const matches = await this.categoriesService.findMany({ crudQuery: {} });
    return matches;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updated = await this.categoriesService.update(id, updateCategoryDto, {
      crudQuery: {},
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoriesService.remove(id, { crudQuery: {} });
  }
}
