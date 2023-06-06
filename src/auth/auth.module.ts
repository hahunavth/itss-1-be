import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { UserModule, UserService } from '@src/users';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: 'jwtSecret',
      signOptions: { expiresIn: '30m' },
    }),
    // UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // LocalStrategy,
    JwtStrategy,
    // RefreshTokenStrategy,
    // UserService,
  ],
})
export class AuthModule {}
