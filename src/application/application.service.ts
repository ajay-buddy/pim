import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Job } from 'bull';
import { UserRepository } from 'src/auth/user.repository';
import { JobRepository } from 'src/job/job.repository';
import { Application } from './application.entity';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application-dto';
import { APPLICATIONSTAGE } from './enum/application-stage.enum';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
  ) {}

  async getAllApplication(page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    return this.applicationRepository.findAndCount({
      order: {
        updated_at: 'DESC',
      },
      take: take,
      skip: skip,
      relations: ['job'],
    });
  }

  async getApplicationByUser(user: string, page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    return this.applicationRepository.findAndCount({
      where: {
        applied_by: user,
      },
      order: {
        updated_at: 'DESC',
      },
      take: take,
      skip: skip,
      relations: ['job'],
    });
  }

  async getApplicationByJob(job: string, page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    return this.applicationRepository.findAndCount({
      where: {
        job: job,
      },
      order: {
        updated_at: 'DESC',
      },
      take: take,
      skip: skip,
      relations: ['job'],
    });
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ): Promise<Application> {
    const { applied_by, job, stage, id } = createApplicationDto;
    let application = null;
    if (id) {
      application = await this.applicationRepository.findOne({ id });
      application.updated_by = user;
    } else {
      application = new Application();
      application.updated_by = user;
      application.created_by = user;
    }
    if (applied_by) {
      application.applied_by = await this.userRepository.findOne({
        id: applied_by,
      });
    } else {
      application.applied_by = user;
    }

    const j = await this.jobRepository.findOne({ id: job });
    j.applied_count += 1;
    await j.save();
    application.job = j;

    if (stage) {
      application.stage = APPLICATIONSTAGE[stage];
    }

    return application.save();
  }
}
