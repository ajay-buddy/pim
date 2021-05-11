import { EntityRepository, Repository } from 'typeorm';
import { Vendors } from './vendors.entity';

@EntityRepository(Vendors)
export class VendorsRepository extends Repository<Vendors> {}
