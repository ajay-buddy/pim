import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './education.entity';
import { EducationRepository } from './education.repository';
import { CreateEducationDto } from './dto/create-education-dto';
import { UserRepository } from 'src/auth/user.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationRepository)
    private educationRepository: EducationRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async getAllEducation(user: User): Promise<Education[]> {
    return this.educationRepository.find({
      where: {
        belongs_to: user,
      },
      order: {
        start: 'DESC',
      },
    });
  }
  async getEducationByUser(user: User, id: string): Promise<Education[]> {
    const belongs_to = await this.userRepository.findOne({ id });
    return this.educationRepository.find({
      where: {
        belongs_to,
      },
      order: {
        start: 'DESC',
      },
    });
  }

  async createEducation(
    createEducationDto: CreateEducationDto,
    user: User,
  ): Promise<Education> {
    let education = null;
    if (createEducationDto.id) {
      education = await this.educationRepository.findOne({
        id: createEducationDto.id,
      });
    } else {
      education = new Education();
      education.created_by = user;

      if (createEducationDto.user_id) {
        education.belongs_to = await this.userRepository.findOne({
          id: createEducationDto.user_id,
        });
      } else {
        education.belongs_to = user;
      }
    }
    education.name = createEducationDto.name;
    education.start = createEducationDto.start;
    education.end = createEducationDto.end;
    education.collage_name = createEducationDto.collage_name;
    education.university_name = createEducationDto.university_name;
    education.type = createEducationDto.type;
    if (createEducationDto.education_tags) {
      education.education_tags = await this.tagRepository.findByIds(
        createEducationDto.education_tags,
      );
    }
    education.updated_by = user;

    return education.save();
  }
}
