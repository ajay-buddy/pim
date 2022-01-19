import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('job')
@UseGuards(AuthGuard('jwt'))
export class JobController {
  constructor(private jobService: JobService) {}

  @Get('/all')
  getAllJob(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('name') name: string,
    @Query('e_req_date') e_req_date: string,
    @Query('s_req_date') s_req_date: string,
    @Query('req_id') req_id: string,
    @Query('job_tags') job_tags: string,
    @Query('email') email: string,
    @Query('spoc') spoc: string,
    @Query('priority') priority: string,
    @Query('submited_by') submited_by: string,
  ) {
    return this.jobService.getAllJob(
      page,
      limit,
      name,
      e_req_date,
      s_req_date,
      req_id,
      job_tags,
      email,
      spoc,
      priority,
      submited_by,
    );
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createJob(@Body() createCategoryDto: CreateJobDto): Promise<Job> {
    return this.jobService.createJob(createCategoryDto);
  }

  @Post('/create/bulk')
  @UsePipes(ValidationPipe)
  bulkCreateJob(@Body() createCategoryDto: CreateJobDto[]) {
    return this.jobService.bulkCreateJob(createCategoryDto);
  }
}
