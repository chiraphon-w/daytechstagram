import { UserEntity } from 'src/users/user.entity';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Get,
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
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { GetUsername } from 'src/users/get-username-decorator';
import { PostEntity } from './post.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
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
    console.log(file);
    const fileExtension = extname(file.filename);
    const imageFile = post.id + extname(file.filename);
    fsExtra.move(file.path, `upload/${post.id}` + fileExtension);
    post.image = imageFile;
    await post.save();
    return post;
  }
}
