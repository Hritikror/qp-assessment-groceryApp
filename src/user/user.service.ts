import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LogInUserDto } from 'src/dto/login-user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.isAdmin = false;
    newUser.password = createUserDto.password;

    return await this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
}
