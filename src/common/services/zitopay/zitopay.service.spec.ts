import { Test, TestingModule } from '@nestjs/testing';
import { ZitopayService } from './zitopay.service';

describe('ZitopayService', () => {
  let service: ZitopayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZitopayService],
    }).compile();

    service = module.get<ZitopayService>(ZitopayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
