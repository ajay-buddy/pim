import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from './transactions.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async createTransaction(d, p, q = 0, type) {
    const trans = new Transaction();
    trans.product = d;
    trans.price = p;
    trans.quantity = q;
    trans.previous_quantity = d.quantity;
    trans.direction = type;
    return await trans.save();
  }
}
