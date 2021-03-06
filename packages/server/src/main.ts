import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExpressPeerServer } from 'peer';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);

  const peerServer = ExpressPeerServer(app.getHttpServer(), {
    path: '/',
  });

  app.use('/peer', peerServer);
  const PORT = process.env.PORT || configService.get('SERVER_PORT') || '8081';
  const server = await app.listen(PORT);

  console.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();
