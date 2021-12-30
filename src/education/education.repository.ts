import { EntityRepository, Repository } from 'typeorm';
import { Education } from './education.entity';

@EntityRepository(Education)
export class EducationRepository extends Repository<Education> {}
