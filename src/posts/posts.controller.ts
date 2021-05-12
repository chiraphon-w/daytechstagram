import { UserEntity } from 'src/users/user.entity';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { extname } from 'path';
import * as fsExtra from 'fs-extra';
import { FileInterceptor } from '@nestjs/platform-express';

import { GetUsername } from 'src/users/get-username-decorator';
import { PostEntity } from './post.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  async addPost(
    @UploadedFile() file,
    @Body() createPostDto: CreatePostDto,
    @GetUsername() user: UserEntity,
  ): Promise<PostEntity> {
    const post = await this.postsService.createPost(createPostDto, file, user);
    await post.save();
    return post;
  }

  @Get()
  getPosts(@GetUsername() user: UserEntity) {
    return this.postsService.getPosts(user);
  }

  @Get('/:id')
  getPostById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.postsService.getPostById(id, user);
  }

  @Patch('/:id/desc')
  async updatePostById(
    @Param('id') id: number,
    @Body('desc') desc: string,
    @GetUsername() user: UserEntity,
  ) {
    return await this.postsService.updatePostById(id, desc, user);;
  }

  @Delete('/:id')
  deletePostById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    return this.postsService.deletePostById(id, user);
  }
}
