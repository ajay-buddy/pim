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
import { Vendors } from '../vendors/vendors.entity';

@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Transaction, (transaction) => transaction.purchase)
  transactions: Transaction[];

  @ManyToOne(() => Vendors, (vendor) => vendor.purchase)
  vendor: Vendors;
}
