import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { ActionRepository } from './action.repository';
import { ActionService } from './action.service';
import { JobRepository } from '../job/job.repository';
import { EducationRepository } from '../education/education.repository';
import { ApplicationRepository } from '../application/application.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActionRepository,
      EducationRepository,
      ApplicationRepository,
    ]),
  ],

  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
