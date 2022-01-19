import { EntityRepository, Repository } from 'typeorm';
import { Action } from './action.entity';

@EntityRepository(Action)
export class ActionRepository extends Repository<Action> {}
