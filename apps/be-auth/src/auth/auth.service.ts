import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@app/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async registerUser(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      phone_number: createUserInput.phone_number,
    });

    if (user) throw new BadRequestException('This phone number already exist!');

    const newUser = this.usersRepository.create(createUserInput);

    const hashed_password = await bcrypt.hash(
      createUserInput.password,
      this.configService.get<number>('BCRYPT_SALT')
    );

    newUser.password = hashed_password;

    return await this.usersRepository.save(newUser);
  }

  async loginUser(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    const user = await this.usersRepository.findOneBy({
      phone_number: loginUserInput.phone_number,
    });

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(
      loginUserInput.password,
      user.password
    );

    if (!isMatch) throw new UnauthorizedException();

    const access_token = await this.jwtService.signAsync({
      username: user.phone_number,
      sub: user.id,
    });

    return {
      user: user,
      access_token: access_token,
    };
  }
}
