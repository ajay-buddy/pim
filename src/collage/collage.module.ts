import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollageController } from './collage.controller';
import { CollageRepository } from './collage.repository';
import { CollageService } from './collage.service';
import { JobRepository } from '../job/job.repository';
import { EducationRepository } from '../education/education.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CollageRepository, EducationRepository])],

  controllers: [CollageController],
  providers: [CollageService],
})
export class CollageModule {}
