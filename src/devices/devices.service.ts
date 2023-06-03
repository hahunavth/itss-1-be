import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class DevicesService extends PrismaCrudService {
  constructor() {
    super({
      model: 'devices',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
