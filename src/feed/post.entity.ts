import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  @Entity()
  @Unique(['username'])
  export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    image: string;
  
    @Column()
    desc: string;
  
    @UpdateDateColumn()
    updated: Date;
  }
  