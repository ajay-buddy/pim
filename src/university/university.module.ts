import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityController } from './university.controller';
import { UniversityRepository } from './university.repository';
import { UniversityService } from './university.service';
import { JobRepository } from '../job/job.repository';
import { EducationRepository } from '../education/education.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniversityRepository, EducationRepository]),
  ],

  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
