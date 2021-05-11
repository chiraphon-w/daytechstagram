import { UserEntity } from 'src/users/user.entity';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostsDto } from './dto/create-posts.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fsExtra from 'fs-extra';
import { GetUsername } from 'src/users/get-username-decorator';
import { PostEntity } from './post.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  async addPost(
    @UploadedFile() file,
    @Body() createPostsDto: CreatePostsDto,
    @GetUsername() user: UserEntity,
  ): Promise<PostEntity> {
    createPostsDto.userId = user.id;
    const post = await this.postsService.createPost(
      createPostsDto,
      file.filename,
    );
    post.userId = user.id;
    const imageFile = post.id + extname(file.originalname);
    fsExtra.move(file.path, `upload/${imageFile}`);
    post.image = imageFile;
    await post.save();
    return post;
  }

  // @Get()
  // getStocks(@Query('keyword') keyword: string, @Req() req) {
  //   return this.stockService.getProducts(keyword);
  // }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  getStockById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Delete('/:id')
  deleteStockById(@Param('id') id: number) {
    return this.postsService.deletePostById(id);
  }
}
