import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { map, zip } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/ping')
  pingApp(@Query('app') app: 'one' | 'two') {
    switch (app) {
      case 'one':
        return this.gatewayService.callAppOne();
      case 'two':
        return this.gatewayService.callAppTwo();
      default:
        throw new NotFoundException('App not found');
    }
  }

  @Get('/ping-all')
  pingAll() {
    return zip(
      this.gatewayService.callAppOne(),
      this.gatewayService.callAppTwo(),
    ).pipe(
      map(([pongServiceA, pongServiceB]) => ({
        pongServiceA,
        pongServiceB,
      })),
    );
  }

  @Get('/lib')
  lib() {
    return this.gatewayService.callLibOne();
  }
}
