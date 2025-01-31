import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET, // Usar la variable de entorno
        signOptions: { expiresIn: '60m' },
      }),
      UserModule, // Add this line
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
  })
  export class AuthModule {}
