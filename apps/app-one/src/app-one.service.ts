import { Injectable } from '@nestjs/common';

@Injectable()
export class AppOneService {
  ping(): string {
    return 'Hello from App One!';
  }
}
