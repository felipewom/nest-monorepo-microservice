import { Controller } from '@nestjs/common';
import { AppTwoService } from './app-two.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppTwoController {
  constructor(private readonly appTwoService: AppTwoService) {}

  @MessagePattern({ cmd: 'ping' })
  ping(): string {
    return this.appTwoService.ping();
  }
}
