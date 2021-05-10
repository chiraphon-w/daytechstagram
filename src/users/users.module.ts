import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserJwtStrategy } from './user.jwt.strategy';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'daytech', // รหัสลับที่ใช้ในการ endcode
      signOptions: {
        expiresIn: '365d',
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserJwtStrategy],
  exports: [UserJwtStrategy, PassportModule]
})
export class UsersModule {}
