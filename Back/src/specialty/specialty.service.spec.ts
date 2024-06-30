import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyService } from './specialty.service';

describe('SpecialtyService', () => {
  let service: SpecialtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialtyService],
    }).compile();

    service = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
