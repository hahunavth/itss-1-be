import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeShopV2Dto } from './create-coffee-shop-v2.dto';

export class UpdateCoffeeShopV2Dto extends PartialType(CreateCoffeeShopV2Dto) {}
