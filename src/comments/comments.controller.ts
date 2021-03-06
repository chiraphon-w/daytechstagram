import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from 'src/users/get-username-decorator';
import { UserEntity } from 'src/users/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @Get()
  getComments(): Promise<CommentEntity[]>  {
    return this.commentsService.getComments();
  }

  @Get('/:id')
  getCommentById(@Param('id', ParseIntPipe) id: number, @GetUsername() user: UserEntity): Promise<CommentEntity>  {
    return this.commentsService.getCommentById(id, user);
  }

  @Get('/:postId')
  getCommentByPostId(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.getCommentByPostId(postId, user);
  }

  @Patch('/:id/desc')
  async updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body('desc') desc: string,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return await this.commentsService.updateCommentById(id, desc, user);
  }

  @Delete('/:id')
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.deleteCommentById(id, user);
  }
}
