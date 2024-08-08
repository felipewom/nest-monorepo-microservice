import { Test, TestingModule } from '@nestjs/testing';
import { LibOneService } from './lib-one.service';

describe('LibOneService', () => {
  let service: LibOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibOneService],
    }).compile();

    service = module.get<LibOneService>(LibOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
