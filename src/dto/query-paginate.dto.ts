import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { IQueryDto } from './i-query.dto';

export class PaginateQueryDto implements IQueryDto {
  @IsOptional()
  @IsNumber()
  /**
   * REVIEW: Implicit transform not working!
   */
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;

  toQuery() {
    const query: any = {};
    // if (this.page) {
    query['page'] = this.page || 1;
    // }
    // if (this.pageSize) {
    query['pageSize'] = this.pageSize || 25;
    // }
    return query;
  }
}
