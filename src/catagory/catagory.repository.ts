import { EntityRepository, Repository } from 'typeorm';
import { Catagory } from './catagory.entity';

@EntityRepository(Catagory)
export class CatagoryRepository extends Repository<Catagory> {}
