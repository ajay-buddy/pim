import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from './stage.entity';
import { StageRepository } from './stage.repository';
import { CreateStageDto } from './dto/create-stage-dto';
import { Like } from 'typeorm';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(StageRepository)
    private stageRepository: StageRepository,
  ) {}

  async getAllStage(): Promise<Stage[]> {
    return this.stageRepository.find();
  }

  async getMatchStage(key: string): Promise<Stage[]> {
    return this.stageRepository.find({
      name: Like(`%${key}%`),
    });
  }

  async createStage(createStageDto: CreateStageDto): Promise<Stage> {
    const { name } = createStageDto;

    const stage = new Stage();

    stage.name = name;

    return stage.save();
  }

  async editStage(createStageDto: CreateStageDto, id: string): Promise<Stage> {
    const { name } = createStageDto;

    const stage = await this.stageRepository.findOne({ id });

    stage.name = name;

    return stage.save();
  }

  async deleteStage(id: string): Promise<Stage> {
    const stage = await this.stageRepository.findOne({ id });

    return stage.remove();
  }
}
