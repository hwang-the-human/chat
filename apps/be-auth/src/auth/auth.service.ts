import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@app/common/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
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
}
