import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LibOneModule } from '@lib-one/lib-one';

describe('GatewayController', () => {
  let app: INestApplication;
  const gatewayService = {
    callAppOne: () => Promise.resolve('Hello from App One!'),
    callAppTwo: () => Promise.resolve('Hello from App Two!'),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'APP_ONE',
            transport: Transport.TCP,
          },
          {
            name: 'APP_TWO',
            transport: Transport.TCP,
          },
        ]),
      ],
      controllers: [GatewayController],
      providers: [GatewayService],
    })
      .overrideProvider(GatewayService)
      .useValue(gatewayService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('root', () => {
    it('when receive request to /ping with app one should return Hello from App One!', () => {
      return request(app.getHttpServer())
        .get('/ping?app=one')
        .expect(200)
        .expect('Hello from App One!');
    });
    it('when receive request to /ping with app two should return Hello from App Two!', () => {
      return request(app.getHttpServer())
        .get('/ping?app=two')
        .expect(200)
        .expect('Hello from App Two!');
    });
    it('when receive request to /ping-all should return Hello from App One! and Hello from App Two!', () => {
      return request(app.getHttpServer()).get('/ping-all').expect(200).expect({
        pongServiceA: 'Hello from App One!',
        pongServiceB: 'Hello from App Two!',
      });
    });
    it("when receive request to /lib should return 'pong' from lib-one", async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [
          ClientsModule.register([
            {
              name: 'APP_ONE',
              transport: Transport.TCP,
            },
            {
              name: 'APP_TWO',
              transport: Transport.TCP,
            },
          ]),
          LibOneModule,
        ],
        controllers: [GatewayController],
        providers: [GatewayService],
      }).compile();
      const app2 = moduleRef.createNestApplication();
      await app2.init();
      return request(app2.getHttpServer())
        .get('/lib')
        .expect(200)
        .expect('pong');
    });
  });
});
