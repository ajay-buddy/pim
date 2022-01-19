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
import { DashboardService } from './dashboard.service';
import { CreateTagDto } from './dto/create-tag-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/my/profile')
  getMyProfile(@Body() createCategoryDto: CreateTagDto, @GetUser() user: User) {
    return this.dashboardService.getMyProfile(user);
  }

  @Post('/my/profile')
  @UsePipes(ValidationPipe)
  getMyProfile1(@Body() createCategoryDto: CreateTagDto) {
    // return this.dashboardService.getMyProfile();
  }
}
