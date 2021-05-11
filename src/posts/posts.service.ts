import { CreatePostsDto } from './dto/create-posts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as fsExtra from 'fs-extra';

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

  getPosts() {
    return this.postRepository.find();
  }
  
  async getPostById(id: number) {
    const found = await this.postRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Post ${id} is not found!!!`);
    }
    return found;
  }

  async deletePostById(id: number) {
    const found = await this.getPostById(id);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`); //เอาไว้ลบรูป
    return await this.postRepository.delete(id);
  }
}
