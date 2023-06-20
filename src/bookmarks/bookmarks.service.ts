import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { PrismaService } from '@src/common';

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookmarkDto: CreateBookmarkDto) {
    return this.prisma.bookmarks.create({ data: createBookmarkDto });
  }

  remove(query: CreateBookmarkDto) {
    this.prisma.bookmarks.delete({
      where: {
        coffee_shop_ID_user_ID: query,
      },
    });
  }
}
