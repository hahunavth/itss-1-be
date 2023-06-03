import { CrudQueryObj } from 'nestjs-prisma-crud';

/**
 * Interface for query in findMany method of CrudService
 *
 */
export interface IQueryDto {
  /**
   * @brief Convert to a part of query object
   * @returns query object
   * @see CrudQueryObj
   */
  toQuery(): CrudQueryObj;
}
