import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule {}
