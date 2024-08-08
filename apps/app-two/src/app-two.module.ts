import { Module } from '@nestjs/common';
import { AppTwoController } from './app-two.controller';
import { AppTwoService } from './app-two.service';

@Module({
  imports: [],
  controllers: [AppTwoController],
  providers: [AppTwoService],
})
export class AppTwoModule {}
