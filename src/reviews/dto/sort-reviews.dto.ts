import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class SortReviewsDto {
  @ApiProperty({
    enum: ['create_at'],
  })
  @IsOptional()
  @IsEnum(['create_at'])
  orderBy?: 'create_at';

  @ApiProperty({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderType?: 'asc' | 'desc';
}
