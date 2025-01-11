import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthService } from './jwt-service';

describe('JwtService', () => {
  let provider: JwtAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthService],
    }).compile();

    provider = module.get<JwtAuthService>(JwtAuthService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
