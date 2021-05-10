import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  signUp(userCredentialDto: UserCredentialDto): Promise<User> {
    return this.userRepository.createUser(userCredentialDto);
  }
}
