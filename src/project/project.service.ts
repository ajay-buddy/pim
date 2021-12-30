import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create-project-dto';
import { UserRepository } from 'src/auth/user.repository';
import { TagRepository } from 'src/tag/tag.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async getAllProject(user: User): Promise<Project[]> {
    return this.projectRepository.find({
      where: {
        belongs_to: user,
      },
      order: {
        start: 'DESC',
      },
    });
  }
  async getProjectByUser(user: User, id: string): Promise<Project[]> {
    const belongs_to = await this.userRepository.findOne({ id });
    console.log(belongs_to);
    return this.projectRepository.find({
      where: {
        belongs_to,
      },
      order: {
        start: 'DESC',
      },
    });
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    let project = null;
    if (createProjectDto.id) {
      project = await this.projectRepository.findOne({
        id: createProjectDto.id,
      });
    } else {
      project = new Project();
      project.created_by = user;

      if (createProjectDto.user_id) {
        project.belongs_to = await this.userRepository.findOne({
          id: createProjectDto.user_id,
        });
      } else {
        project.belongs_to = user;
      }
    }
    project.name = createProjectDto.name;
    project.start = createProjectDto.start;
    project.end = createProjectDto.end;
    project.description = createProjectDto.description;
    project.company_name = createProjectDto.company_name;
    project.type = createProjectDto.type;
    if (createProjectDto.project_tags) {
      const t = await this.tagRepository.findByIds(
        createProjectDto.project_tags,
      );
      project.project_tags = t;
    }

    project.updated_by = user;

    return project.save();
  }
}
