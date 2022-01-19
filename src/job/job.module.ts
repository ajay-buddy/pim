import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';
import { CompanyRepository } from '../company/company.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { SpocRepository } from '../spoc/spoc.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobRepository,
      CompanyRepository,
      TagRepository,
      SpocRepository,
    ]),
  ],

  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
