import { Injectable } from '@nestjs/common';

@Injectable()
export class LibOneService {
  ping() {
    return 'pong';
  }
}
