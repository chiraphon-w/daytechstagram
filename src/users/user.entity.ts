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
import { PostEntity } from 'src/posts/post.entity';
import { CommentEntity } from './../comments/comment.entity';


@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
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

  @OneToMany(() => PostEntity, (post) => post.user, { eager: true })
  posts: PostEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.user, { eager: true })
  comments: CommentEntity;


}
