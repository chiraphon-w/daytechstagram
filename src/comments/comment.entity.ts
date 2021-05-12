import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from 'src/posts/post.entity';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
