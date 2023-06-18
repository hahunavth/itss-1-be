//src/auth/auth.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards';
import { Roles } from '@src/role/roles.decorator';
import { Role } from '@src/role/role.enum';
import { RolesGuard } from '@src/role/roles.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('private')
  private() {
    return 'private';
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(
    // req: any,
    @Request() req: any,
  ) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get('admin')
  admin(
    // req: any,
    @Request() req: any,
  ) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  // @Roles(Role.User)
  @ApiBearerAuth()
  @Get('user')
  user(
    // req: any,
    @Request() req: any,
  ) {
    return req.user;
  }
}
