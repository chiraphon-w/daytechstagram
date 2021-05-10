import { CreatePostsDto } from './dto/create-posts.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    async createPost(createPostsDto: CreatePostsDto): Promise<Post> {
        const { desc, image } = createPostsDto;
        // console.log('third');
        const post = new Post();
        post.desc = desc;
        post.image = image;
        await post.save(); //บันทึกข้อมูลเข้า DB, Promise จะสั่งงานโดยไม่หยุดรอให้เสร็จก่อน >> ต้อง await
        return post;
      }
}
