import { Module } from '@nestjs/common';
import { AppOneController } from './app-one.controller';
import { AppOneService } from './app-one.service';

@Module({
  imports: [],
  controllers: [AppOneController],
  providers: [AppOneService],
})
export class AppOneModule {}
