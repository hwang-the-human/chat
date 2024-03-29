import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
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
      consumer: {
        groupId: 'be-core',
      },
    },
  });

  const port = configService.get<number>('NX_BE_CORE_PORT');

  app.use(cors());
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
