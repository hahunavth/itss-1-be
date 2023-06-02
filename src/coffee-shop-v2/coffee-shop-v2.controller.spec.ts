import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeShopV2Controller } from './coffee-shop-v2.controller';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';

describe('CoffeeShopV2Controller', () => {
  let controller: CoffeeShopV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeShopV2Controller],
      providers: [CoffeeShopV2Service],
    }).compile();

    controller = module.get<CoffeeShopV2Controller>(CoffeeShopV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
