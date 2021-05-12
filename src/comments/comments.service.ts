import { CommentEntity } from 'src/comments/comment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentRepository.createComment(createCommentDto, user);
  }

  getComments(user: UserEntity): Promise<CommentEntity[]> {
    return this.commentRepository.find();
  }

  async getCommentById(id: number, user: UserEntity): Promise<CommentEntity> {
    const found = await this.commentRepository.findOne({
      where: { id, userId: user.id }, // id = id ของ comment
    });

    if (!found) {
      throw new NotFoundException(`Comment with id: ${id} is not found!!!`);
    }
    return found;
  }

  async getCommentByPostId(
    postId: number,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const found = await this.commentRepository.findOne({
      where: { postId, userId: user.id }, // id = id ของ comment
    });
    if (!found) {
      throw new NotFoundException(`Comment with id: ${postId} is not found!!!`);
    }
    return found;
  }

  async updateCommentById(
    id: number,
    desc: string,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const comment = await this.getCommentById(id, user);
    comment.desc = desc;
    await comment.save();
    return comment;
  }

  async deleteCommentById(id: number, user: UserEntity) {
    const found = await this.getCommentById(id, user);
    const result = await this.commentRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id: ${id} is not found`);
    } else {
      return found;
    }
  }
}
