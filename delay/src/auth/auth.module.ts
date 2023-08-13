// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule.register({
      secret: 'yourSecretKey',  // Replace with your secret key
      signOptions: { expiresIn: '60s' },  // Token expiration time. Adjust as needed
    })
  ],
  providers: [AuthService],
  controllers: [AuthController], 
}) 
export class AuthModule {}
