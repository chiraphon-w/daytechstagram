import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/posts/post.entity';
import { Comment } from './../comments/comment.entity';


@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  async verifyPassword(password) {
    const hashPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashPassword;
  }

  @OneToMany(() => Post, (post) => post.user, { eager: true })
  posts: Post;

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comments: Comment;


}
