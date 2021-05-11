import { CreatePostsDto } from './dto/create-posts.dto';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async createPost(createPostsDto: CreatePostsDto, fileName: string): Promise<PostEntity> {
    const { desc, image, userId } = createPostsDto;
    // console.log('third');
    const post = new PostEntity();
    post.desc = desc;
    post.image = fileName;
    post.userId = userId;
    await post.save(); //บันทึกข้อมูลเข้า DB, Promise จะสั่งงานโดยไม่หยุดรอให้เสร็จก่อน >> ต้อง await
    return post;
  }

  // async addPost(@UploadedFile() file, @Body() createPostsDto: CreatePostsDto, @GetUsername() username) {

  // }
}
