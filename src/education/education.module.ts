import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { EducationController } from './education.controller';
import { EducationRepository } from './education.repository';
import { EducationService } from './education.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationRepository,
      UserRepository,
      TagRepository,
    ]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
