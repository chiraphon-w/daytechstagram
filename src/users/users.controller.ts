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

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    // console.log(req)
    // return req.user.username
    return username;
  }
}
