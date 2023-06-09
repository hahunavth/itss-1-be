import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IQueryDto } from '@src/dto/i-query.dto';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

function stringOrArrayAttrQuery(attr: string | string[]) {
  if (Array.isArray(attr)) {
    return {
      hasEvery: attr,
    };
  }
  return {
    has: [attr],
  };
}

export class QueryCoffeeShopV2Dto implements IQueryDto {
  @ApiProperty({
    description: 'Tìm coffee shop có chứa tên hoặc địa chỉ này',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
  })
  @IsDate()
  @IsOptional()
  @Transform(({ obj }) => {
    const value = obj.opening_at;
    if (typeof value === 'string') {
      if (value.match(/^\d{2}:\d{2}$/))
        return new Date(`${'1970-01-01T'}${value}:00Z`);
      else
        throw new HttpException(
          'Invalid opening_at: require HH:mm format but got ' + value,
          HttpStatus.BAD_REQUEST,
        );
    }
    return value;
  })
  opening_at?: Date;

  @ApiProperty({
    description: 'Bắt đầu mở từ thời gian này',
    type: String,
  })
  @IsDate()
  @IsOptional()
  @Transform(({ obj }) => {
    const value = obj.closing_at;
    if (typeof value === 'string') {
      if (value.match(/^\d{2}:\d{2}$/)) {
        if (!obj.opening_at || value > obj.opening_at)
          return new Date(`${'1970-01-01T'}${value}:00Z`);
        else return new Date(`${'1970-01-02T'}${value}:00Z`);
      } else
        throw new HttpException(
          'Invalid closing_at: require HH:mm format but got ' + value,
          HttpStatus.BAD_REQUEST,
        );
    }
    return value;
  })
  closing_at?: Date;

  // @ApiProperty({
  //   description: 'Match exactly business_hours',
  // })
  // @IsOptional()
  // @IsString()
  // business_hours?: string;

  /**
   * REVIEW
   * @type string | string[] but do not insert `string` here
   * It will cause problem with swagger
   */
  @ApiProperty({
    description: 'Tìm coffee shop có chứa tất cả các category trong đây',
  })
  @IsOptional()
  // @IsArray()
  categories?: string[];
  @ApiProperty({
    description: 'Tìm coffee shop có chứa tất cả các device trong đây',
  })
  @IsOptional()
  // @IsArray()
  devices?: string[];

  @ApiProperty({
    enum: ['id', 'name', 'crowded', 'review_count', 'avg_star', 'status'],
  })
  @IsOptional()
  @IsEnum(['id', 'name', 'crowded', 'review_count', 'avg_star', 'status'])
  /**
   * REVIEW
   * do not replace type string with enum here
   * It will cause problem with swagger
   */
  orderBy?: string = 'id';

  @ApiProperty({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  /**
   * REVIEW
   * do not replace type string with enum here
   * It will cause problem with swagger
   */
  orderType?: string = 'asc';

  @ApiProperty({
    description:
      'Thời gian của client hiện tại, dùng để tính giờ đông đúc hiện tại (lưu ý là thời gian UTC, ko thêm múi giờ)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  now?: Date = new Date(Date.now());

  @ApiProperty({
    description: 'Trạng thái đông đúc hiện tại, (tính theo thời gian now)',
    enum: [0, 1, 2],
    isArray: true,
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  // @Min(0, { each: true })
  // @Max(2, { each: true })
  @Type(() => Number)
  crowded_status?: number[];
  //  = [];

  @ApiProperty({
    description:
      'Filter các coffee_shop đã đc bookmark, (cần truyền thêm user_id)',
    enum: ['bookmarked', 'not_bookmarked', 'all'],
  })
  @IsOptional()
  @IsEnum(['bookmarked', 'not_bookmarked', 'all'])
  bookmark_type?: 'bookmarked' | 'not_bookmarked' | 'all';

  @ApiProperty({
    description: `User_id để filter theo bookmarked_type và trường bookmarked của coffee shop\n
      - Vói coffee_shop.bookmarked
        + Nếu không truyền user_ID thì các coffee_shop đều có trường bookmarked = 0
        + Nếu truyền user_ID thì các coffee_shop có trường bookmarked = 1 nếu có bookmark của user đó
      - Với bookmarked_type = 'bookmarked' | 'not_bookmarked'
        + Nếu không truyền user_ID thì lỗi 400
      `,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_ID?: number;

  toQuery() {
    const query = {
      where: {},
    };

    if (this.name) {
      query.where['name'] = {
        contains: this.name,
      };
    }
    // if (this.business_hours) {
    //   query.where['business_hours'] = this.business_hours;
    // }
    if (this.opening_at) {
      query.where['opening_at'] = {
        lte: this.opening_at,
      };
    }
    if (this.closing_at) {
      query.where['closing_at'] = {
        gte: this.closing_at,
      };
    }
    if (this.categories) {
      query.where['coffee_shop_categories'] = {
        every: {
          category: {
            name: {
              in:
                typeof this.categories === 'string'
                  ? [this.categories]
                  : this.categories,
            },
          },
        },
      };
      // query.where['coffee_shop_categories.categories'] = stringOrArrayAttrQuery(
      //   this.categories,
      // );
    }
    if (this.devices) {
      query.where['devices'] = stringOrArrayAttrQuery(this.devices);
    }

    query['orderBy'] = {
      [this.orderBy]: this.orderType,
    };

    return query;
  }
}
