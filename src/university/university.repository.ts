import { EntityRepository, Repository } from 'typeorm';
import { University } from './university.entity';

@EntityRepository(University)
export class UniversityRepository extends Repository<University> {}
