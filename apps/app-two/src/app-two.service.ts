import { Injectable } from '@nestjs/common';

@Injectable()
export class AppTwoService {
  ping(): string {
    return 'Hello from App Two!';
  }
}
