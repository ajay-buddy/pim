import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatagoryController } from './catagory.controller';
import { CatagoryRepository } from './catagory.repository';
import { CatagoryService } from './catagory.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatagoryRepository])],
  controllers: [CatagoryController],
  providers: [CatagoryService],
})
export class CatagoryModule {}
