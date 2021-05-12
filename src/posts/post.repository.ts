import { CreatePostDto } from './dto/create-post.dto';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { extname } from 'path';
import * as fsExtra from 'fs-extra';
import { UserEntity } from 'src/users/user.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async createPost(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
    user: UserEntity,
  ): Promise<PostEntity> {
    const { desc } = createPostDto;
    const post = new PostEntity();
    post.desc = desc;
    post.user = user;
    await post.save();

    if (file) {
      const imageFile = post.id + extname(file.originalname);
      fsExtra.move(file.path, `upload/${imageFile}`);
      post.image = imageFile;
      await post.save();
    }
    delete post.user;
    return post;
  }

}
