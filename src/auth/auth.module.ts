import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './AuthController';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
