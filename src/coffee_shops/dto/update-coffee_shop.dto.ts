import { PartialType } from '@nestjs/swagger';

import { CreateCoffeeShopDto } from './create-coffee_shop.dto';

export class UpdateCoffeeShopDto extends PartialType(CreateCoffeeShopDto) {}
