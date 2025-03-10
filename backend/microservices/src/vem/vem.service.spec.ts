import { Test, TestingModule } from '@nestjs/testing';
import { VemService } from './vem.service';

describe('VemService', () => {
  let service: VemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VemService],
    }).compile();

    service = module.get<VemService>(VemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
