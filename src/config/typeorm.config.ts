import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '242542',
  database: 'Daytechstagram',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
