import { Controller } from '@nestjs/common';
import { AppOneService } from './app-one.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppOneController {
  constructor(private readonly appOneService: AppOneService) {}

  @MessagePattern({ cmd: 'ping' })
  ping(): string {
    return this.appOneService.ping();
  }
}
