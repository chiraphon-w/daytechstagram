import { CreatePostsDto } from './dto/create-posts.dto';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}
  async createPost(createPostsDto: CreatePostsDto, fileName: string) {
    // console.log('second');
    return await this.postRepository.createPost(createPostsDto, fileName);
  }
}
