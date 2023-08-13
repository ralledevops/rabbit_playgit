// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async findOneByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async register(userDto: any): Promise<User> {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    return User.create(userDto);
  }
}

