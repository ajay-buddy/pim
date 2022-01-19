import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course-dto';
import { Like } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async getAllCourse(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async getMatchCourse(key: string): Promise<Course[]> {
    return this.courseRepository.find({
      name: Like(`%${key}%`),
    });
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name } = createCourseDto;

    const course = new Course();

    course.name = name;

    return course.save();
  }

  async editCourse(
    createCourseDto: CreateCourseDto,
    id: string,
  ): Promise<Course> {
    const { name } = createCourseDto;

    const course = await this.courseRepository.findOne({ id });

    course.name = name;

    return course.save();
  }

  async deleteCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ id });

    return course.remove();
  }
}
