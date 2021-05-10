import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Get,
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
  async addPost(@Body() createPostsDto: CreatePostsDto) {
    const post = await this.postsService.createPost(createPostsDto);
    // return this.usersService.signUp(createPostsDto);
    // console.log(post);
    await post.save();
    return post;
  }

}
