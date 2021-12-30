import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';
import { UserRepository } from 'src/auth/user.repository';
import { JobRepository } from 'src/job/job.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationRepository,
      JobRepository,
      UserRepository,
    ]),
  ],

  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
