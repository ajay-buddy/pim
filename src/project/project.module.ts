import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      UserRepository,
      TagRepository,
      CompanyRepository,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
