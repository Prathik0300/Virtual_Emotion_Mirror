import { Module } from '@nestjs/common';
import { AuthService } from './auth';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from 'src/jwt/jwt-auth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtAuthModule],
  imports: [UserModule, JwtAuthModule],
})
export class AuthModule {}
