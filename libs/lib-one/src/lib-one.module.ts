import { Module } from '@nestjs/common';
import { LibOneService } from './lib-one.service';

@Module({
  providers: [LibOneService],
  exports: [LibOneService],
})
export class LibOneModule {}
