import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = process.env.PORT || configService.get('SERVER_PORT') || '8081';
  await app.listen(PORT);

  console.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
