import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobRepository } from './job.repository';
import { CreateJobDto } from './dto/create-job-dto';
import { EMPLOYMENTTYPE } from './enum/employment_type.enum';
import { TagRepository } from 'src/tag/tag.repository';
import { SpocRepository } from '../spoc/spoc.repository';
import { Tag } from 'src/tag/tag.entity';
import { Like, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,

    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,

    @InjectRepository(SpocRepository)
    private spocRepository: SpocRepository,
  ) {}

  async getAllJob(
    page: string,
    limit: string,
    name: string,
    e_req_date: string,
    s_req_date: string,
    req_id: string,
    job_tags: string,
    email: string,
    spoc: string,
    priority: string,
    submited_by: string,
  ) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    console.log(s_req_date, e_req_date, name);
    if (name) {
      return this.jobRepository.find({ name: Like(`%${name}%`) });
    }
    return this.jobRepository.findAndCount({
      order: {
        updated_at: 'DESC',
      },
      join: {
        alias: 'job',
      },
      where: (qb: SelectQueryBuilder<Job>) => {
        if (spoc) {
          qb.innerJoinAndSelect('job.spoc', 'jobSpoc');
          qb.andWhere('jobSpoc.id IN(:...spoc)', {
            spoc: spoc.split(',')?.map((d) => d),
          });
        }
        if (job_tags) {
          qb.innerJoinAndSelect('job.job_tags', 'jobTags');
          qb.andWhere('jobTags.id IN(:...job_tags)', {
            job_tags: job_tags.split(',')?.map((d) => d),
          });
        }
        if (submited_by) {
          qb.andWhere('job.submited_by LIKE(:submited_by)', {
            submited_by: `%${submited_by}%`,
          });
        }
        if (email) {
          qb.andWhere('job.email LIKE(:email)', { email: `%${email}%` });
        }
        if (priority) {
          qb.andWhere('job.priority LIKE(:priority)', {
            priority: `%${priority}%`,
          });
        }
        if (req_id) {
          qb.andWhere('job.req_id IN(:...req_id)', {
            req_id: req_id.split(',')?.map((d) => d),
          });
        }
        if (s_req_date && e_req_date) {
          console.log(s_req_date, e_req_date);
          qb.andWhere('job.req_date >= :s_req_date', {
            s_req_date: s_req_date,
            e_req_date: e_req_date,
          });
          qb.andWhere('job.req_date <= :e_req_date', {
            s_req_date: s_req_date,
            e_req_date: e_req_date,
          });
        }
      },
      take: take,
      skip: skip,
      relations: ['application', 'job_company', 'job_tags', 'spoc'],
    });
  }

  async bulkCreateJob(createJobDto: CreateJobDto[]) {
    const success = [];
    const failed = [];

    for (let i = 0; i < createJobDto.length; i++) {
      try {
        await this.createJob(createJobDto[i]);
        success.push(createJobDto[i]);
      } catch (err) {
        console.log(err);
        failed.push(createJobDto[i]);
      }
    }
    return {
      success,
      failed,
    };
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const {
      name,
      job_tags,
      spoc,
      description,
      company_name,
      type,
      is_active,
      vacancies,
      id,
    } = createJobDto;

    let job = null;
    if (createJobDto.id) {
      job = await this.jobRepository.findOne({ id: createJobDto.id });
    } else {
      job = new Job();
    }

    if (spoc.id) {
      const sp = await this.spocRepository.findOne({ id: spoc.id });
      job.spoc = sp;
    } else if (spoc.email) {
      const sp = await this.spocRepository.findOne({ email: spoc.email });
      job.spoc = sp;
    } else if (spoc.label) {
      const sp = await this.spocRepository.findOne({ email: spoc.label });
      job.spoc = sp;
    } else if (spoc.spoc_id) {
      const sp = await this.spocRepository.findOne({ spoc_id: spoc.spoc_id });
      job.spoc = sp;
    }

    const tags: string[] = [];
    const tags_create: string[] = [];
    job_tags?.map((t) => {
      if (t.id) {
        tags.push(t.id);
      } else {
        tags_create.push(t.name);
      }
    });

    if (tags_create) {
      for (let i = 0; i < tags_create.length; i++) {
        const found = await this.tagRepository.findOne({
          name: tags_create[i],
        });
        if (found) {
          tags.push(found.id);
        } else {
          const tag = new Tag();
          tag.name = tags_create[i];
          const result = await tag.save();
          tags.push(result.id);
        }
      }
    }

    if (tags) {
      const tagList = await this.tagRepository.findByIds(tags);
      job.job_tags = tagList;
    }

    job.name = name;
    job.description = description;
    job.type = type;
    job.is_active = !!is_active;
    job.vacancies = vacancies;

    job.req_id = createJobDto.req_id;
    job.submited_by = createJobDto.submited_by;
    job.priority = createJobDto.priority;
    job.req_date = createJobDto.req_date;

    return job.save();
  }
}
