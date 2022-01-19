import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { JobRepository } from '../job/job.repository';
import { EducationRepository } from '../education/education.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository, EducationRepository])],

  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
