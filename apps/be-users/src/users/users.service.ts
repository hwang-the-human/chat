import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      phone_number: createUserInput.phone_number,
    });

    if (user) throw new BadRequestException('This phone number already exist!');

    const newUser = this.usersRepository.create(createUserInput);

    const hashed_password = await bcrypt.hash(
      createUserInput.password,
      +this.configService.get('BCRYPT_SALT')
    );

    newUser.password = hashed_password;

    return await this.usersRepository.save(newUser);
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
