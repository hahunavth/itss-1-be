import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeShopV2Service } from './coffee-shop-v2.service';

describe('CoffeeShopV2Service', () => {
  let service: CoffeeShopV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeShopV2Service],
    }).compile();

    service = module.get<CoffeeShopV2Service>(CoffeeShopV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
