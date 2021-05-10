import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  // map ข้อมูลกับตัว DB
  // 1 table แทนด้วย 1 repo 1 entity
  // entity กำหนดว่าจะมี column อะไรบ้าง
  // เป็น schema
  @Entity()
  @Unique(['username'])
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    // @Column()
    // salt: string;
  
    // async verifyPassword(password) {
    //   const hashPassword = await bcrypt.hash(password, this.salt);
    //   return this.password === hashPassword;
    // }
  }
  