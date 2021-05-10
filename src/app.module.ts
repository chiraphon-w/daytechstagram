import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeOrmConfig), FeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
