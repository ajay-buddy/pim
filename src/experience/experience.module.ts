import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceController } from './experience.controller';
import { ExperienceRepository } from './experience.repository';
import { ExperienceService } from './experience.service';
import { TagRepository } from '../tag/tag.repository';
import { UserRepository } from 'src/auth/user.repository';
import { CompanyRepository } from 'src/company/company.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExperienceRepository,
      UserRepository,
      TagRepository,
      CompanyRepository,
    ]),
  ],

  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
