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
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getAllProject(@GetUser() user: User): Promise<Project[]> {
    return this.projectService.getAllProject(user);
  }
  @Get('/candidate/:id')
  getProjectByUser(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Project[]> {
    return this.projectService.getProjectByUser(user, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProject(
    @GetUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto, user);
  }
}
