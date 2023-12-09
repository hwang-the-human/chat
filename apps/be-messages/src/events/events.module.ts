import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsController } from './events.controller';
import { Socket } from 'socket.io';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MESSAGES_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get<string>('KAFKA_BROKER')],
              // ssl: {
              //   ca: [configService.get<string>('SSL_CA')],
              //   key: configService.get<string>('SSL_KEY'),
              //   cert: configService.get<string>('SSL_CERT'),
              // },
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsGateway],
})
export class EventsModule {}
