import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { LibOneService } from '@lib-one/lib-one';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('APP_ONE') private readonly clientAppOne: ClientProxy,
    @Inject('APP_TWO') private readonly clientAppTwo: ClientProxy,
    @Inject() private readonly libOne: LibOneService,
  ) {}

  callAppOne() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientAppOne
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  callAppTwo() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientAppTwo
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  callLibOne() {
    return this.libOne.ping();
  }
}
