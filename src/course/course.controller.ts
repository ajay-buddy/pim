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
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  getAllCourse(): Promise<Course[]> {
    return this.courseService.getAllCourse();
  }

  @Get('/find')
  getMatchCourse(@Query('name') key: string): Promise<Course[]> {
    return this.courseService.getMatchCourse(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createCourse(@Body() createCategoryDto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(createCategoryDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editCourse(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCourseDto,
  ): Promise<Course> {
    return this.courseService.editCourse(createCategoryDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.deleteCourse(id);
  }
}
