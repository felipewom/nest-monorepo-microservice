import { Test, TestingModule } from '@nestjs/testing';
import { AppOneController } from './app-one.controller';
import { AppOneService } from './app-one.service';

describe('AppOneController', () => {
  let appOneController: AppOneController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppOneController],
      providers: [AppOneService],
    }).compile();

    appOneController = app.get<AppOneController>(AppOneController);
  });

  describe('root', () => {
    it('should return "Hello from App One!"', () => {
      expect(appOneController.ping()).toBe('Hello from App One!');
    });
  });
});
