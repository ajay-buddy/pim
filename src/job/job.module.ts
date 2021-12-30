import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
