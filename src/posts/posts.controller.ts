import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostsDto } from './dto/create-posts.dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  signUp(@Body() createPostsDto: CreatePostsDto) {
    // return this.usersService.signUp(createPostsDto);
    console.log(createPostsDto);
  }
}
