import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '@src/common';
import { QueryReviewsDto } from './dto/query-reviews.dto';
import { PaginateQueryDto } from '@src/dto/query-paginate.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  _transformSelectItem(item) {
    const newItem = { ...item };
    if (newItem.images) {
      newItem.images = newItem.images.map((img) => img.image_url);
    }
    return newItem;
  }

  _transformSelectList(list: any[]) {
    return list.map((i) => this._transformSelectItem(i));
  }

  _transformCreateImageAttr(imgs: string[], coffee_shop_ID: number) {
    return {
      createMany: {
        skipDuplicates: true,
        data: imgs.map((url) => ({
          image_url: url,
          coffee_shop_ID: coffee_shop_ID,
        })),
      },
    };
  }

  async create(createReviewDto: CreateReviewDto) {
    return this._transformSelectItem(
      await this.prismaService.reviews.create({
        data: {
          review: createReviewDto.review,
          star: createReviewDto.star,
          user_ID: createReviewDto.user_ID,
          coffee_shop_ID: createReviewDto.coffee_shop_ID,
          images: this._transformCreateImageAttr(
            createReviewDto.images,
            createReviewDto.coffee_shop_ID,
          ),
        },
        include: {
          images: true,
        },
      }),
    );
  }

  async findAll(query: QueryReviewsDto, paginate?: PaginateQueryDto) {
    return this._transformSelectList(
      await this.prismaService.reviews.findMany({
        where: query,
        include: {
          images: true,
        },
        ...(paginate ? paginate.toPrismaQuery() : {}),
      }),
    );
  }

  async findOne(id: number) {
    return this._transformSelectItem(
      await this.prismaService.reviews.findUnique({
        where: {
          id: id,
        },
        include: {
          images: true,
        },
      }),
    );
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return this._transformSelectItem(
      await this.prismaService.reviews.update({
        data: {
          review: updateReviewDto.review,
          star: updateReviewDto.star,
          user_ID: updateReviewDto.user_ID,
          coffee_shop_ID: updateReviewDto.coffee_shop_ID,
          images: {
            createMany: {
              skipDuplicates: true,
              data: updateReviewDto.images.map((url) => ({
                image_url: url,
                coffee_shop_ID: updateReviewDto.coffee_shop_ID,
              })),
            },
          },
        },
        where: {
          id: id,
        },
        include: {
          images: true,
        },
      }),
    );
  }

  async remove(id: number) {
    return this._transformSelectItem(
      await this.prismaService.reviews.delete({
        where: {
          id,
        },
        include: {
          images: true,
        },
      }),
    );
  }
}
