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
import { UniversityService } from './university.service';
import { University } from './university.entity';
import { CreateUniversityDto } from './dto/create-university-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('university')
@UseGuards(AuthGuard('jwt'))
export class UniversityController {
  constructor(private universityService: UniversityService) {}

  @Get()
  getAllUniversity(): Promise<University[]> {
    return this.universityService.getAllUniversity();
  }

  @Get('/find')
  getMatchUniversity(@Query('name') key: string): Promise<University[]> {
    return this.universityService.getMatchUniversity(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUniversity(
    @Body() createUniversityDto: CreateUniversityDto,
  ): Promise<University> {
    return this.universityService.createUniversity(createUniversityDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editUniversity(
    @Param('id') id: string,
    @Body() createUniversityDto: CreateUniversityDto,
  ): Promise<University> {
    return this.universityService.editUniversity(createUniversityDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteUniversity(@Param('id') id: string): Promise<University> {
    return this.universityService.deleteUniversity(id);
  }
}
