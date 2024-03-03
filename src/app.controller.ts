import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './models/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Post('/login')
  @UseGuards(AuthGuard("local"))
  signIn() {
    console.log("ZIG ZAG")
    return "Success login"
  }
}
