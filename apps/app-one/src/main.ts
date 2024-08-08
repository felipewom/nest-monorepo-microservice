import { NestFactory } from '@nestjs/core';
import { AppOneModule } from './app-one.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('app-one');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppOneModule, {
    transport: Transport.TCP,
    options: {
      port: process.env.APP_ONE_PORT || 3001,
    },
  });
  logger.log(
    `Microservice APP-ONE is listening to port :${process.env.APP_ONE_PORT || 3001}`,
  );
  await app.listen();
}
bootstrap();
