import { OmitType } from '@nestjs/swagger';
import { Bookmark } from '../entities/bookmark.entity';

export class CreateBookmarkDto extends Bookmark {}
