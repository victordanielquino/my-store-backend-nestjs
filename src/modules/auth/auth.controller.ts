import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './services/auth.service';
import { UserAuthReadDto } from '../../core/models/dtos';

@ApiTags('Controller: Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    // const user = req.user as User;
    const user = req.user as UserAuthReadDto;
    return this.authService.login(user);
  }
}
