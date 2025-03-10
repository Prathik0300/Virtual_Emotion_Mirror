import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { VemController } from './vem/vem.controller';
import { VemModule } from './vem/vem.module';
import { AnalysisModule } from './analysis/analysis.module';
import { UtilsController } from './utils/utils.controller';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    VemModule,
    AnalysisModule,
    UtilsModule,
  ],
  controllers: [AppController, AuthController, UserController, VemController, UtilsController],
  providers: [AppService],
})
export class AppModule {}
