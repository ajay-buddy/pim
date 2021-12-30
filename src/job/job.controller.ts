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
  getAllJob(@Query('page') page: string, @Query('limit') limit: string) {
    return this.jobService.getAllJob(page, limit);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createProduct(@Body() createCategoryDto: CreateJobDto): Promise<Job> {
    return this.jobService.createJob(createCategoryDto);
  }
}
