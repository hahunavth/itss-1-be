import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBookmarkDto } from './create-bookmark.dto';

export class QueryBookmarkDto extends PartialType(CreateBookmarkDto) {}
