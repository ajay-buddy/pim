import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageController } from './stage.controller';
import { StageRepository } from './stage.repository';
import { StageService } from './stage.service';
import { JobRepository } from '../job/job.repository';
import { EducationRepository } from '../education/education.repository';
import { ApplicationRepository } from '../application/application.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StageRepository,
      EducationRepository,
      ApplicationRepository,
    ]),
  ],

  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
