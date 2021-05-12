import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CommentRepository } from './comment.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    UsersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
