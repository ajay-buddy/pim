import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database-1.cdmkmgsabrgs.us-east-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'productmanagement',
  // entities: [join(__dirname + '/../**/*.entity{.ts, .js}')],
  autoLoadEntities: true,
  synchronize: true,
};