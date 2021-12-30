import { EntityRepository, Repository } from 'typeorm';
import { Experience } from './experience.entity';

@EntityRepository(Experience)
export class ExperienceRepository extends Repository<Experience> {}
