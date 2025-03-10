import { Test, TestingModule } from '@nestjs/testing';
import { VemController } from './vem.controller';

describe('VemController', () => {
  let controller: VemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VemController],
    }).compile();

    controller = module.get<VemController>(VemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
