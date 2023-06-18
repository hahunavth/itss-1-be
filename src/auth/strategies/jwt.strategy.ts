import { PrismaService } from '@src/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'jwtSecret',
    });
  }

  async validate(
    // payload: any,
    payload: { userId: number },
  ) {
    const user = await this.prismaService.users.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // return { userId: payload };
  }
}
