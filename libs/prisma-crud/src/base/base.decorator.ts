// import { FilterBookDto } from './../../routes/book/dto/filter-book.dto';
import { applyDecorators, Type } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import * as moment from 'moment';
import { PaginateReqQueryT } from './base.dto';

/*
 * @brief Transform request param / query decorator
 *
 * Created on Wed Dec 14 2022
 * Copyright (c) 2022 Hahunavth
 *
 * @deprecated
 */

/*
 * @brief Parse: req.query => paginate attrs
 * @deprecated
 */
export const PaginateQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PaginateReqQueryT => {
    const query = ctx.switchToHttp().getRequest().query;

    const { limit, page } = query;

    const _page = Number.parseInt(page as string);
    const _limit = Number.parseInt(limit as string);

    const offset = (_page - 1) * _limit;
    return {
      page: _page || undefined,
      offset: offset || undefined,
      limit: _limit || undefined,
    };
  },
);

/**
 * Error: Cannot map req query to attribute of instance dto
 * @deprecated use Query decorator instead
 * @brief Nhận danh sách filter từ request.query
 *
 * @param _filterCls Class chứa attribute để filter
 * @deprecated
 */
export const AttrQuery = createParamDecorator(
  (_filterCls: Type<any>, ctx: ExecutionContext) => {
    const query = ctx.switchToHttp().getRequest().query;
    const filter = objAttrMapper(new _filterCls(), query);
    return filter;
  },
);

export type TimeQueryT = { startAt?: Date; endAt?: Date; where?: any };

// TODO
export const TimeQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const query = ctx.switchToHttp().getRequest().query;
    let { startAt, endAt } = query;

    const result: { startAt?: Date; endAt?: Date; where?: any } = {};
    if (
      startAt != null
      //  && moment(String(startAt))
    ) {
      startAt = moment(String(startAt)).format('YYYY-MM-DD HH:mm:ss');
      result.startAt = new Date(startAt);
    }
    if (endAt != null && moment(String(endAt))) {
      endAt = moment(String(endAt)).format('YYYY-MM-DD HH:mm:ss');
      result.endAt = new Date(endAt);
    }

    const list: {
      gte?: Date;
      lte?: Date;
    }[] = [];

    result.where = {};
    if (startAt) {
      list.push({ gte: result.startAt });
    }
    if (result.endAt) {
      list.push({ lte: result.endAt });
    }
    if (list.length == 2) {
      result.where = { createdAt: { AND: list } };
    } else if (list.length == 1) {
      result.where = { createdAt: list[0] };
    }

    return result;
  },
);

type ApiGetAllQueryOptionT = {
  filter?: any;
  time?: any;
  paginate?: any;
};

/**
 * @brief: reqeest param includes:
 *  - page, linit
 *  - filter by model attribute
 *
 * @param filter filter class
 * @returns
 */
export const ApiGetAllQuery = <TModel extends Type<any>>(
  filter: TModel,
  option?: ApiGetAllQueryOptionT,
) => {
  const defaultOption: ApiGetAllQueryOptionT = {
    filter: true,
    time: true,
    paginate: true,
  };

  const appliedOption = { ...defaultOption, ...option };

  const factory = (filter: TModel) => {
    const decorators = [];
    if (appliedOption.time) {
      decorators.push(
        ApiQuery({ name: 'page', type: Number, required: false }),
      );
      decorators.push(
        ApiQuery({ name: 'limit', type: Number, required: false }),
      );
    }
    if (appliedOption.paginate) {
      decorators.push(
        ApiQuery({ name: 'startAt', type: String, required: false }),
      );
      decorators.push(
        ApiQuery({ name: 'endAt', type: String, required: false }),
      );
    }
    if (appliedOption.filter) {
      decorators.push(ApiExtraModels(filter));
      // decorators.push(ApiQuery({ type: filter }));
    }
    return decorators;
  };

  return applyDecorators(...factory(filter));
};

/**
 * Error: Cannot map req query to attribute of instance dto
 * @param target
 * @param source
 * @returns
 */
export function objAttrMapper(target: object, source: object) {
  // console.log(Object.getOwnPropertyNames(target));
  Object.getOwnPropertyNames(target).forEach((key, i, a) => {
    const attributeType = Reflect.getMetadata('design:type', target, key);
    console.log(` >${key}: ${attributeType}`);
    console.log(`${typeof target[key]}`);
    if (Object.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    } else {
      delete target[key];
    }
  });
  return target;
}
