import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { ExperienceRepository } from './experience.repository';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { TagRepository } from '../tag/tag.repository';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(ExperienceRepository)
    private experienceRepository: ExperienceRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async getAllExperience(user: User): Promise<Experience[]> {
    return this.experienceRepository.find({
      where: {
        belongs_to: user,
      },
      order: {
        start: 'DESC',
      },
    });
  }
  async getExperienceByUser(user: User, id: string): Promise<Experience[]> {
    const belongs_to = await this.userRepository.findOne({ id });
    return this.experienceRepository.find({
      where: {
        belongs_to,
      },
      order: {
        start: 'DESC',
      },
    });
  }

  async createExperience(
    createExperienceDto: CreateExperienceDto,
    user: User,
  ): Promise<Experience> {
    let experience = null;
    if (createExperienceDto.id) {
      experience = await this.experienceRepository.findOne({
        id: createExperienceDto.id,
      });
      console.log(experience);
    } else {
      experience = new Experience();
      experience.created_by = user;

      if (createExperienceDto.user_id) {
        experience.belongs_to = await this.userRepository.findOne({
          id: createExperienceDto.user_id,
        });
      } else {
        experience.belongs_to = user;
      }
    }

    experience.start = createExperienceDto.start;
    experience.end = createExperienceDto.end;
    experience.description = createExperienceDto.description;
    experience.company_name = createExperienceDto.company_name;
    experience.type = createExperienceDto.type;
    experience.is_present = createExperienceDto.is_present;
    if (createExperienceDto.experience_tags) {
      experience.experience_tags = await this.tagRepository.findByIds(
        createExperienceDto.experience_tags,
      );
    }

    experience.updated_by = user;

    return experience.save();
  }
}
