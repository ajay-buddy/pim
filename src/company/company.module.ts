import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { JobRepository } from '../job/job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository, JobRepository])],

  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
