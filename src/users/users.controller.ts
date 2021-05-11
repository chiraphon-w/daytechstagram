import {
  Body,
  Controller,
  Get,
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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredentialDto: UserCredentialDto) {
    return this.usersService.signUp(userCredentialDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentialDto: UserCredentialDto) {
    // console.log(userCredentialDto);
    return this.usersService.signIn(userCredentialDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(@Req() req, user: UserEntity) {
    // console.log(req)
    // return req.user.username
    // return username;
    return this.usersService.getUsers(user);
  }
}
