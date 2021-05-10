import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(userCredentialDto: UserCredentialDto): Promise<User> {
    return this.userRepository.createUser(userCredentialDto);
  }

  async signIn(userCredentialDto: UserCredentialDto) {
    const username = await this.userRepository.verifyUserPassword(
      userCredentialDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }

    //payload
    const payload = { username };
    const token = await this.jwtService.sign(payload);

    return { token };
    // return this.userRepository.verifyUserPassword(userCredentialDto);
  }
}
