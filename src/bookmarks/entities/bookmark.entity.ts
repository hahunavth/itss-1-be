import { bookmarks } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class Bookmark implements bookmarks {
  @IsNumber()
  user_ID: number;

  @IsNumber()
  coffee_shop_ID: number;
}
