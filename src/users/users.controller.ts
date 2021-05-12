import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserCredentialDto } from './dto/user-credential.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username-decorator';
import { UserEntity } from './user.entity';
import { PostEntity } from 'src/posts/post.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredentialDto: UserCredentialDto): Promise<UserEntity> {
    return this.usersService.signUp(userCredentialDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentialDto: UserCredentialDto): Promise<{
    token: string;
  }> {
    return this.usersService.signIn(userCredentialDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(): Promise<UserEntity[]> {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @Get('/:id/posts')
  getPostsByUserId(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.usersService.getPostsByUserId(id);
  }
}
