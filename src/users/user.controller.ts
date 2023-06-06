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
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '@src/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginateQueryDto } from '@src/dto/query-paginate.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prismaService: PrismaService,
  ) {}

  @Post('user')
  @ApiOperation({})
  async signupUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(userData);
  }

  @ApiOperation({})
  @Get('users/:id')
  @ApiOkResponse({ type: UserEntity })
  async getOneUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({})
  @Get('users')
  // @ApiQuery({ type: FilterUserDto })
  async getAllUser(@Query() paginate: PaginateQueryDto) {
    const data = await this.prismaService.users.findMany({
      skip: (paginate.toQuery().page - 1) * paginate.toQuery().pageSize,
      take: paginate.toQuery().pageSize,
      where: {
        // ...queryByAttributes(filterAttrs),
      },
    });

    return {
      data,
      ...paginate.toQuery(),
    };
  }

  @ApiOperation({})
  @Patch('users/:id')
  @ApiOkResponse({ type: UserEntity })
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.userService.update(id, body);
  }

  @ApiOperation({})
  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @ApiOperation({})
  @Get('users/:id/reviews')
  async getReviewsByUser(@Param('id') id: number) {
    // todo: paginate
    return this.prismaService.reviews.findMany({
      where: {
        user_ID: id,
      },
    });
  }
}
