import { CreatePostDto } from './dto/create-post.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as fsExtra from 'fs-extra';
import { Express } from 'express';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}
  async createPost(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
    user: UserEntity,
  ) {
    return await this.postRepository.createPost(createPostDto, file, user);
  }

  getPosts(user: UserEntity) {
    return this.postRepository.find();
  }

  async getPostById(id: number, user: UserEntity) {
    const found = await this.postRepository.findOne({
      where: { id, userId: user.id }, // id = id ของ post, userId = user id ของคนที่สร้าง post, user.id = signIn เข้ามา
    });
    if (!found) {
      throw new NotFoundException(`Post ${id} is not found!!!`);
    }
    return found;
  }

  async updatePostById(id: number, desc: string, user: UserEntity) {
    const post = await this.getPostById(id, user);
    post.desc = desc;
    await post.save();
    return post;
  }

  async deletePostById(id: number, user: UserEntity) {
    const found = await this.getPostById(id, user);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`); //เอาไว้ลบรูป
    const result = await this.postRepository.delete({ id, userId: user.id }); // userId จาก post = user.id signIn
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id: ${id} is not found`);
    } else {
      return found;
    }
  }
}
