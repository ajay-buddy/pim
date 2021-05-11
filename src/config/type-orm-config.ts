import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'productmanagement',
  // entities: [join(__dirname + '/../**/*.entity{.ts, .js}')],
  autoLoadEntities: true,
  synchronize: true,
};
