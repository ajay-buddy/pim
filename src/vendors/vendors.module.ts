import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VendorsRepository])],
  providers: [VendorsService],
  controllers: [VendorsController],
})
export class VendorsModule {}
