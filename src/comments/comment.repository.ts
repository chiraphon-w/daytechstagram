import { CreateCommentDto } from './dto/create-comment.dto';
import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from 'src/users/user.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const { desc, postId } = createCommentDto;

    const comment = new CommentEntity();
    comment.desc = desc;
    comment.user = user;
    comment.postId = postId;
    await comment.save();

    delete comment.user;
    return comment;
  }
}
