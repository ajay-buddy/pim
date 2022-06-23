import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Job } from 'bull';
import { UserRepository } from 'src/auth/user.repository';
import { JobRepository } from 'src/job/job.repository';
import { Application, ApplicationActivity } from './application.entity';
import {
  ApplicationActivityRepository,
  ApplicationRepository,
} from './application.repository';
import { CreateApplicationDto } from './dto/create-application-dto';
import { APPLICATIONSTAGE } from './enum/application-stage.enum';
import { CreateApplicationActivityDto } from './dto/create-application-activity.dto';
import { ActionRepository } from '../actions/action.repository';
import { StageRepository } from '../stages/stage.repository';
import { ProfileRepository } from '../profile/profile.repository';
import { Action } from 'src/actions/action.entity';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,

    @InjectRepository(ApplicationActivityRepository)
    private applicationActivityRepository: ApplicationActivityRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,

    @InjectRepository(ActionRepository)
    private actionRepository: ActionRepository,

    @InjectRepository(StageRepository)
    private stageRepository: StageRepository,
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async getAllApplication(
    page: string,
    limit: string,
    applicant_name: string,
    applicant_email: string,
    applicant_phone: string,
    job_req_id: string,
    job_spoc_name: string,
    job_company_name: string,
  ) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;

    console.log(
      '===>',
      applicant_name,
      applicant_email,
      applicant_phone,
      job_req_id,
      job_spoc_name,
      job_company_name,
    );

    return this.applicationRepository.findAndCount({
      join: {
        alias: 'application',
      },

      where: (qb: SelectQueryBuilder<Application>) => {
        if (applicant_name || applicant_email || applicant_phone) {
          qb.innerJoinAndSelect('application.applicant', 'applicants');
        }
        if (applicant_name) {
          qb.where('LOWER(applicants.name) LIKE(:name)', {
            name: `%${applicant_name.toLowerCase()}%`,
          });
        }
        if (applicant_email) {
          qb.where('LOWER(applicants.email) LIKE(:email)', {
            email: `%${applicant_email.toLowerCase()}%`,
          });
        }
        if (applicant_phone) {
          qb.where('applicants.phone LIKE(:phone)', {
            phone: `%${applicant_phone}%`,
          });
        }
        if (job_req_id || job_spoc_name || job_company_name) {
          qb.innerJoinAndSelect('application.job', 'job');
          qb.innerJoinAndSelect('job.spoc', 'spoc');
          // qb.innerJoinAndSelect('spoc.company', 'company');
        }
        if (job_req_id) {
          qb.where('job.req_id = :job_req_id', {
            job_req_id: `${job_req_id}`,
          });
        }
        if (job_spoc_name) {
          qb.where('LOWER(spoc.name) LIKE(:job_spoc_name)', {
            job_spoc_name: `%${job_spoc_name.toLowerCase()}%`,
          });
        }
        // if (job_company_name) {
        //   qb.where('LOWER(company.name) LIKE(:job_company_name)', {
        //     job_company_name: `%${job_company_name.toLowerCase()}%`,
        //   });
        // }
      },
      relations: [
        'applicant',
        'job',
        'job.spoc',
        'logs',
        'logs.action',
        'logs.profile',
      ],
      take: take,
      skip: skip,
      order: {
        updated_at: 'DESC',
      },
    });

    //   {
    //   order: {
    //     updated_at: 'DESC',
    //   },
    //   take: take,
    //   skip: skip,
    //   relations: ['applicant', 'job', 'logs', 'logs.action', 'logs.profile'],
    // });
  }

  async getApplicationById(id: string): Promise<Application> {
    return this.applicationRepository.findOne({
      where: { id },
      relations: ['job', 'logs', 'logs.action', 'logs.stage'],
    });
  }

  async getApplicationByUser(user: string, page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    return this.applicationRepository.findAndCount({
      where: {
        applicant: user,
      },
      order: {
        updated_at: 'DESC',
      },
      take: take,
      skip: skip,
      relations: ['applicant',
      'logs',
      'logs.action',
      'logs.profile',],
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
      relations: ['job', 'logs', 'logs.action', 'logs.stage'],
    });
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ): Promise<Application> {
    const { applicant, job, id, action } = createApplicationDto;
    let application = null;
    if (id) {
      application = await this.applicationRepository.findOne({
        where: { id },
        relations: ['logs'],
      });
      application.updated_by = user;
    } else {
      application = new Application();
      application.updated_by = user;
      application.created_by = user;
    }

    if (job) {
      let found = null;
      if (job.id) {
        found = await this.jobRepository.findOne({ id: job.id });
      } else if (job.job_id) {
        found = await this.jobRepository.findOne({ req_id: job.job_id });
      }
      if (found) {
        application.job = found;
      }
    }
    if (
      applicant &&
      (!application.applicant ||
        (application.applicant && application.applicant.id !== applicant.id))
    ) {
      let found = null;
      if (applicant.id) {
        found = await this.profileRepository.findOne({ id: applicant.id });
      } else if (applicant.email) {
        found = await this.profileRepository.findOne({
          email: applicant.email,
        });
      } else if (applicant.name) {
        found = await this.profileRepository.findOne({ name: applicant.name });
      }
      if (found) {
        console.log(found);
        application.applicant = found;
      }
    }

    if (action) {
      const application_activity = new ApplicationActivity();
      let found = null;

      if (action.id) {
        found = await this.actionRepository.findOne({ id: action.id });
      } else if (action.name) {
        found = await this.actionRepository.findOne({ name: action.name });
      }
      if (!found) {
        found = new Action();
        found.name = action.name;
        found = await found.save();
      }
      application_activity.action = found;
      if (action.created_by) {
        let found = null;
        if (action.created_by.id) {
          found = await this.profileRepository.findOne({
            id: action.created_by.id,
          });
        } else if (action.created_by.emp_code) {
          found = await this.profileRepository.findOne({
            emp_code: action.created_by.emp_code,
          });
        } else if (action.created_by.email) {
          found = await this.profileRepository.findOne({
            email: action.created_by.email,
          });
        }

        if (found) {
          application_activity.profile = found;
        } else {
          found = await this.profileRepository.findOne({
            belongs_to: user,
          });
          application_activity.profile = found;
        }
      } else if (action && action.name && !application_activity.profile) {
        found = await this.profileRepository.findOne({
          belongs_to: user,
        });
        application_activity.profile = found;
      }

      if (!application.logs) {
        application.logs = [];
      }
      // application_activity.application = application;
      await application_activity.save();
      application.logs.push(application_activity);
    }

    return application.save();
  }

  async bulkCreateApplication(
    createApplicationDto: CreateApplicationDto[],
    user: User,
  ) {
    const success = [];
    const failed = [];

    for (let i = 0; i < createApplicationDto.length; i++) {
      try {
        await this.createApplication(createApplicationDto[i], user);
        success.push([createApplicationDto[i], user]);
      } catch (err) {
        console.log(err);
        failed.push(createApplicationDto[i]);
      }
    }
    return { success, failed };
  }

  async createApplicationActivity(
    createApplicationActivityDto: CreateApplicationActivityDto,
    user: User,
    id: string,
  ): Promise<Application> {
    const { action, stage, description } = createApplicationActivityDto;
    const activity = new ApplicationActivity();
    const application = await this.applicationRepository.findOne({ id });
    activity.application = application;
    activity.description = description;
    application.updated_by = user;
    // activity.created_by = user;
    activity.updated_by = user;

    if (action) {
      const applicationAction = await this.actionRepository.findOne({
        id: action,
      });
      // application.action.push(applicationAction);
      // activity.action = applicationAction;
    }

    if (stage) {
      const applicationStage = await this.stageRepository.findOne({
        id: stage,
      });
    }
    await activity.save();
    return application.save();
  }
}
