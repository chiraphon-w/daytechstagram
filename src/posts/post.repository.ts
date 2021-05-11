import { CreatePostsDto } from './dto/create-posts.dto';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { extname } from 'path';
import * as fsExtra from 'fs-extra';
import { UserEntity } from 'src/users/user.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async createPost(
    createPostsDto: CreatePostsDto,
    file: Express.Multer.File,
    user: UserEntity,
  ): Promise<PostEntity> {
    const { desc, image } = createPostsDto;
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

  // async updatePost(
  //   file: Express.Multer.File,
  //   id: number,
  //   createPostsDto: CreatePostsDto,
  //   user: UserEntity,
  // ) {
  //   if (file) {
  //     fsExtra.remove(`upload/${post.image}`);
  //     const imageFile = post.id + extname(post.file.filename);
  //     fsExtra.move(post.file.path, `upload/${imageFile}`);
  //     post.image = imageFile;
  //     await post.save();
  //   }
  //   delete post.user;
  //   return post;
  // }
}
