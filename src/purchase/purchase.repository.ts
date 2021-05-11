import { EntityRepository, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@EntityRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase> {}
