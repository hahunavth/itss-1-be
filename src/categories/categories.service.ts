import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class CategoriesService extends PrismaCrudService {
  constructor() {
    super({
      model: 'categories',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
