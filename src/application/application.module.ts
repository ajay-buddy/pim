import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import {
  ApplicationActivityRepository,
  ApplicationRepository,
} from './application.repository';
import { ApplicationService } from './application.service';
import { UserRepository } from 'src/auth/user.repository';
import { JobRepository } from 'src/job/job.repository';
import { ActionRepository } from '../actions/action.repository';
import { StageRepository } from 'src/stages/stage.repository';
import { ProfileRepository } from '../profile/profile.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationRepository,
      ApplicationActivityRepository,
      JobRepository,
      UserRepository,
      ActionRepository,
      StageRepository,
      ProfileRepository,
    ]),
  ],

  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
