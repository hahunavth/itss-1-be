import { IsString } from 'class-validator';

export class SetCategoriesDto {
  @IsString({ each: true })
  categories: string[];
}
