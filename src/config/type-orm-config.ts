import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  // entities: [join(__dirname + '/../**/*.entity{.ts, .js}')],
  autoLoadEntities: true,
  synchronize: true,
};