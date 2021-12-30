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
import { EducationService } from './education.service';
import { Education } from './education.entity';
import { CreateEducationDto } from './dto/create-education-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('education')
@UseGuards(AuthGuard('jwt'))
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get()
  getAllEducation(@GetUser() user: User): Promise<Education[]> {
    return this.educationService.getAllEducation(user);
  }
  @Get('/candidate/:id')
  getEducationByUser(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Education[]> {
    return this.educationService.getEducationByUser(user, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createEducation(
    @GetUser() user: User,
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<Education> {
    return this.educationService.createEducation(createEducationDto, user);
  }
}
