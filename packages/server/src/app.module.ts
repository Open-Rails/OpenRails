import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const clientPath = join(__dirname, '../../../client/build');
console.log(`Serving static files from ${clientPath}`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: clientPath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
