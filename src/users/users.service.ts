import { UserRepository } from './user.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { PostEntity } from 'src/posts/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(userCredentialDto: UserCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(userCredentialDto);
  }

  async signIn(userCredentialDto: UserCredentialDto): Promise<{
    token: string;
  }> {
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
  }

  getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    delete found.posts;
    delete found.comments;
    return found;
  }

  async getPostsByUserId(id: number): Promise<PostEntity> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return found.posts;
  }
}
