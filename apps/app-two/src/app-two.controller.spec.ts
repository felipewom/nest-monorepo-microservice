import { Test, TestingModule } from '@nestjs/testing';
import { AppTwoController } from './app-two.controller';
import { AppTwoService } from './app-two.service';

describe('AppTwoController', () => {
  let appTwoController: AppTwoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppTwoController],
      providers: [AppTwoService],
    }).compile();

    appTwoController = app.get<AppTwoController>(AppTwoController);
  });

  describe('root', () => {
    it('should return "Hello from App Two!"', () => {
      expect(appTwoController.ping()).toBe('Hello from App Two!');
    });
  });
});
