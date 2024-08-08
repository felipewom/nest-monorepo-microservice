import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LibOneModule } from '@lib-one/lib-one';

@Module({
  imports: [
    LibOneModule,
    ClientsModule.register([
      {
        name: 'APP_ONE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: process.env.APP_ONE_PORT
            ? parseInt(process.env.APP_ONE_PORT)
            : 3001,
        },
      },
      {
        name: 'APP_TWO',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: process.env.APP_TWO_PORT
            ? parseInt(process.env.APP_TWO_PORT)
            : 3002,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
