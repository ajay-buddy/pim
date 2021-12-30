import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobRepository } from './job.repository';
import { CreateJobDto } from './dto/create-job-dto';
import { EMPLOYMENTTYPE } from './enum/employment_type.enum';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
  ) {}

  async getAllJob(page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    return this.jobRepository.findAndCount({
      order: {
        updated_at: 'DESC',
      },
      take: take,
      skip: skip,
      relations: ['application'],
    });
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const {
      name,
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

    job.name = name;
    job.description = description;
    job.company_name = company_name;
    job.type = EMPLOYMENTTYPE[type];
    job.is_active = !!is_active;
    job.vacancies = vacancies;

    return job.save();
  }
}
