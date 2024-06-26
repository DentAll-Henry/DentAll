import { Test, TestingModule } from '@nestjs/testing';
import { SystemConfigsService } from './system_configs.service';

describe('SystemConfigsService', () => {
  let service: SystemConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemConfigsService],
    }).compile();

    service = module.get<SystemConfigsService>(SystemConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
