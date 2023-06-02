import { IsArray, IsOptional, IsString } from 'class-validator';

function stringOrArrayAttrQuery(attr: string | string[]) {
  if (Array.isArray(attr)) {
    return {
      hasEvery: attr,
    };
  }
  return {
    has: attr,
  };
}

export class QueryCoffeeShopV2Dto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  business_hours?: string;

  /**
   * REVIEW
   * @type string | string[] but do not insert `string` here
   * It will cause problem with swagger
   */
  @IsOptional()
  @IsArray()
  categories?: string[];
  @IsOptional()
  @IsArray()
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
      query.where['categories'] = stringOrArrayAttrQuery(this.categories);
    }
    if (this.devices) {
      query.where['devices'] = stringOrArrayAttrQuery(this.devices);
    }

    return query;
  }
}
