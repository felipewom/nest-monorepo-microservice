import { NestFactory } from '@nestjs/core';
import { AppTwoModule } from './app-two.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('app-two');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppTwoModule, {
    transport: Transport.TCP,
    options: {
      port: process.env.APP_TWO_PORT || 3002,
    },
  });
  logger.log(
    `Microservice APP-TWO is listening to port :${process.env.APP_ONE_PORT || 3002}`,
  );
  await app.listen();
}
bootstrap();
