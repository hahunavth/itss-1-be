import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IQueryDto } from '@src/dto/i-query.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

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
    description: 'Search contains name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Match exactly business_hours',
  })
  @IsOptional()
  @IsString()
  business_hours?: string;

  /**
   * REVIEW
   * @type string | string[] but do not insert `string` here
   * It will cause problem with swagger
   */
  @ApiProperty({
    description: 'Find coffee shop with all categories name',
  })
  @IsOptional()
  // @IsArray()
  categories?: string[];
  @ApiProperty({
    description: 'Find coffee shop with all devices name',
  })
  @IsOptional()
  // @IsArray()
  devices?: string[];

  toQuery() {
    const query = {
      where: {},
    };

    if (this.name) {
      query.where['name'] = {
        contains: this.name,
      };
    }
    if (this.business_hours) {
      query.where['business_hours'] = this.business_hours;
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

    return query;
  }
}
