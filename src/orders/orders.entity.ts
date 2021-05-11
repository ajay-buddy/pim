import { Customer } from 'src/customer/customer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../transactions/transactions.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Transaction, (transaction) => transaction.order)
  transactions: Transaction[];

  @ManyToOne(() => Customer, (customer) => customer.order)
  customer: Customer;
}
