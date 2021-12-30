import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.entity';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('experience')
@UseGuards(AuthGuard('jwt'))
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @Get()
  getAllExperience(@GetUser() user: User): Promise<Experience[]> {
    return this.experienceService.getAllExperience(user);
  }
  @Get('/candidate/:id')
  getExperienceByUser(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Experience[]> {
    return this.experienceService.getExperienceByUser(user, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @GetUser() user: User,
    @Body() createCategoryDto: CreateExperienceDto,
  ): Promise<Experience> {
    return this.experienceService.createExperience(createCategoryDto, user);
  }
}
