import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  getComments(@GetUsername() user: UserEntity) {
    return this.commentsService.getComments(user);
  }

  @Get('/:id')
  getCommentById(@Param('id') id: number, @GetUsername() user: UserEntity) {
    console.log(id);
    return this.commentsService.getCommentById(id, user);
  }

  @Get('/:postId')
  getCommentByPostId(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUsername() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.getCommentByPostId(postId, user);
  }

  @Delete('/:id')
  deleteComment(
      @Param('id', ParseIntPipe) id: number,
      @GetUsername() user: UserEntity,
      ) {
      return this.commentsService.deleteCommentById(id, user)
  }
}
