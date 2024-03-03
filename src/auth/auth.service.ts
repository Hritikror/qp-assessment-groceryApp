import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LogInUserDto } from './../dto/login-user.dto';
import { User } from './../models/user.entity';

@Injectable()
export class AuthService {

    constructor(private usersService:UserService, private jwtService:JwtService) { }

    async login(authLoginDto: LogInUserDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
            isAdmin: user.isAdmin
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userLoginDto: LogInUserDto): Promise<User> {
        const { email, password } = userLoginDto;

        const user = await this.usersService.findUserByEmail(email);
        if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user;
    }
    
}