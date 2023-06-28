import { Test, TestingModule } from '@nestjs/testing';
import { Base64DocumentController } from './base64-document.controller';

describe('Base64DocumentController', () => {
  let controller: Base64DocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Base64DocumentController],
    }).compile();

    controller = module.get<Base64DocumentController>(Base64DocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
