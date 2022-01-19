import { EntityRepository, Repository } from 'typeorm';
import { Spoc } from './spoc.entity';

@EntityRepository(Spoc)
export class SpocRepository extends Repository<Spoc> {}
