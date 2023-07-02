import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.create(createBookmarkDto);
  }

  @Delete()
  async remove(@Body() query: CreateBookmarkDto) {
    return this.bookmarksService.remove(query);
  }
}
