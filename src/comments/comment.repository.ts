// import { CommentEntity } from 'src/comments/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from 'src/users/user.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  // async createComment(
  //     createCommentsDto: CreateCommentsDto,
  //     user: UserEntity,
  //   ): Promise<CommentEntity> {
  //     const { desc } = createCommentsDto;
  //     const comment = new CommentEntity();
  //     comment.desc = desc;
  //     comment.user = user;
  //     await comment.save();

  //     delete comment.user;
  //     return comment;
  //   }

  async createComment(
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const { desc, postId } = createCommentDto;

    const comment = new CommentEntity();
    comment.desc = desc;
    comment.user = user;
    comment.postId = postId;
    console.log;
    await comment.save();

    delete comment.user; //it doesn't delete comment.user in database, just delete information of user before return response to the frontend
    return comment;
  }
}
