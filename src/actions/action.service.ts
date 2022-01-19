import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from './action.entity';
import { ActionRepository } from './action.repository';
import { CreateActionDto } from './dto/create-action-dto';
import { Like } from 'typeorm';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionRepository)
    private actionRepository: ActionRepository,
  ) {}

  async getAllAction(): Promise<Action[]> {
    return this.actionRepository.find();
  }

  async getMatchAction(key: string): Promise<Action[]> {
    return this.actionRepository.find({
      name: Like(`%${key}%`),
    });
  }

  async createAction(createActionDto: CreateActionDto): Promise<Action> {
    const { name } = createActionDto;

    const action = new Action();

    action.name = name;

    return action.save();
  }

  async editAction(
    createActionDto: CreateActionDto,
    id: string,
  ): Promise<Action> {
    const { name } = createActionDto;

    const action = await this.actionRepository.findOne({ id });

    action.name = name;

    return action.save();
  }

  async deleteAction(id: string): Promise<Action> {
    const action = await this.actionRepository.findOne({ id });

    return action.remove();
  }
}
