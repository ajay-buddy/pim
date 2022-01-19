import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './university.entity';
import { UniversityRepository } from './university.repository';
import { CreateUniversityDto } from './dto/create-university-dto';
import { Like } from 'typeorm';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(UniversityRepository)
    private universityRepository: UniversityRepository,
  ) {}

  async getAllUniversity(): Promise<University[]> {
    return this.universityRepository.find();
  }

  async getMatchUniversity(key: string): Promise<University[]> {
    return this.universityRepository.find({
      name: Like(`%${key}%`),
    });
  }

  async createUniversity(
    createUniversityDto: CreateUniversityDto,
  ): Promise<University> {
    const { name } = createUniversityDto;

    const university = new University();

    university.name = name;

    return university.save();
  }

  async editUniversity(
    createUniversityDto: CreateUniversityDto,
    id: string,
  ): Promise<University> {
    const { name } = createUniversityDto;

    const university = await this.universityRepository.findOne({ id });

    university.name = name;

    return university.save();
  }

  async deleteUniversity(id: string): Promise<University> {
    const University = await this.universityRepository.findOne({ id });

    return University.remove();
  }
}
