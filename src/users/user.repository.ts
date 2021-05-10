import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto;
    const salt = bcrypt.genSaltSync();
    const user = new User();

    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (error) {
      //   console.log(error);
      if (error.code === '23505') {
        console.log(error.code);
        throw new ConflictException(
          'Error, because this username already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

    async hashPassword(password: string, salt: string) {
      return bcrypt.hash(password, salt);
    }
}
