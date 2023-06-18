import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserModule, UserService } from '@src/users';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@src/role/roles.guard';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: 'jwtSecret',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // LocalStrategy,
    JwtStrategy,
    // RefreshTokenStrategy,
    UserService,
    // FIXME: ENABLE THIS TO MAKE GUARD RUN TWICE
    // DISABLE THIS TO MAKE GUARD RUN ONCE
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  exports: [AuthService],
})
export class AuthModule {}
