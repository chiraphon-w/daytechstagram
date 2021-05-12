import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { CommentEntity } from 'src/comments/comment.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'noimage.jpeg' })
  image: string;

  @Column()
  desc: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  userId: number;
  
  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: false, onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post, { eager: true })
  comments: CommentEntity;

}
