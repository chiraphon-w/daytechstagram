import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialDto } from './dto/user-credential.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() userCredentialDto: UserCredentialDto) {
    return this.usersService.signUp(userCredentialDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentialDto: UserCredentialDto) {
    console.log(userCredentialDto);
  }
}
