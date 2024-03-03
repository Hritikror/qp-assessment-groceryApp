import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInUserDto } from './../dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLoginDto: LogInUserDto) {
    console.log("loginnnnn")
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard) //token verification
  @Get('/test')
  async test() {
    return 'You have authorized!';
  }
}