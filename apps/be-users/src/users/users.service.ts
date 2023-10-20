import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from 'apps/be-users/src/users/dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class UsersService {
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
      +this.configService.get<number>('BCRYPT_SALT')
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

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(user_id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: user_id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async removeUserById(user_id: number): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: user_id });

    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.delete({ id: user_id });

    return user;
  }
}
