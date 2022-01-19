import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateApplicationActivityDto } from './dto/create-application-activity.dto';

@Controller('application')
@UseGuards(AuthGuard('jwt'))
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/all')
  getAllJob(@Query('page') page: string, @Query('limit') limit: string) {
    return this.applicationService.getAllApplication(page, limit);
  }

  @Get('/my')
  getMyApplication(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.applicationService.getApplicationByUser(user.id, page, limit);
  }
  @Get('/detail/:id')
  getApplicationById(@Param('id') id: string) {
    return this.applicationService.getApplicationById(id);
  }
  @Get('/job/:id')
  getApplicationByJob(
    @Param('id') id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.applicationService.getApplicationByJob(id, page, limit);
  }
  @Get('/user/:id')
  getApplicationByUser(
    @Param('id') id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.applicationService.getApplicationByUser(id, page, limit);
  }
  @Post('/create')
  @UsePipes(ValidationPipe)
  createApplication(
    @GetUser() user: User,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.createApplication(
      createApplicationDto,
      user,
    );
  }
  @Post('/create/bulk')
  @UsePipes(ValidationPipe)
  bulkCreateApplication(
    @GetUser() user: User,
    @Body() createApplicationDto: CreateApplicationDto[],
  ) {
    return this.applicationService.bulkCreateApplication(
      createApplicationDto,
      user,
    );
  }

  @Post('/activity/:id')
  @UsePipes(ValidationPipe)
  createApplicationActivity(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createApplicationActivityDto: CreateApplicationActivityDto,
  ): Promise<Application> {
    return this.applicationService.createApplicationActivity(
      createApplicationActivityDto,
      user,
      id,
    );
  }
}
