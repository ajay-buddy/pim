import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpocController } from './spoc.controller';
import { SpocRepository } from './spoc.repository';
import { SpocService } from './spoc.service';
import { JobRepository } from '../job/job.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { ProfileRepository } from '../profile/profile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpocRepository,
      CompanyRepository,
      ProfileRepository,
    ]),
  ],

  controllers: [SpocController],
  providers: [SpocService],
})
export class SpocModule {}
