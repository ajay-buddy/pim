import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { EducationController } from './education.controller';
import { EducationRepository } from './education.repository';
import { EducationService } from './education.service';
import { CollageRepository } from '../collage/collage.repository';
import { UniversityRepository } from '../university/university.repository';
import { CourseRepository } from '../course/course.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationRepository,
      UserRepository,
      TagRepository,
      CollageRepository,
      UniversityRepository,
      CourseRepository,
    ]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
