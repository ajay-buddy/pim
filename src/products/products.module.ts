import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';
import { CatagoryRepository } from 'src/catagory/catagory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    TypeOrmModule.forFeature([CatagoryRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
