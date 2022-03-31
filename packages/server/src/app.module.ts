import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const clientPath = join(__dirname, '../../client/build');
console.log(`Serving static files from ${clientPath}`);

@Module({
  imports: [
    // NB: You should be using 'path.resolve' to find the .env file
    ConfigModule.forRoot({ envFilePath: '../../.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: clientPath,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // implements NestModule {
  //   configure(consumer: MiddlewareConsumer) {
  //   }
}
