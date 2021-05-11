import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TRANSACTION_STATUS } from './transaction-status.enum';
import { Product } from 'src/products/products.entity';
import { Purchase } from '../purchase/purchase.entity';
import { Order } from 'src/orders/orders.entity';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.transactions)
  purchase: Purchase;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.transactions)
  order: Order;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  previous_quantity: number;

  @Column()
  direction: TRANSACTION_STATUS;
}
