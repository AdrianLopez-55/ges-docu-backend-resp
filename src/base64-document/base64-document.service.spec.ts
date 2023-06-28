import { Test, TestingModule } from '@nestjs/testing';
import { Base64DocumentService } from './base64-document.service';

describe('Base64DocumentService', () => {
  let service: Base64DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Base64DocumentService],
    }).compile();

    service = module.get<Base64DocumentService>(Base64DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
