import { EntityRepository, Repository } from 'typeorm';
import { Application, ApplicationActivity } from './application.entity';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {}

@EntityRepository(ApplicationActivity)
export class ApplicationActivityRepository extends Repository<ApplicationActivity> {}
