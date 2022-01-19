import { EntityRepository, Repository } from 'typeorm';
import { Collage } from './collage.entity';

@EntityRepository(Collage)
export class CollageRepository extends Repository<Collage> {}
