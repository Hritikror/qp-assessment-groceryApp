import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { User } from 'src/models/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post('/signup')
  createUser(@Body() createUserDto:CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
