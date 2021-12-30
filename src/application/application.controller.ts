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
  createProduct(
    @GetUser() user: User,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.createApplication(
      createApplicationDto,
      user,
    );
  }
}
