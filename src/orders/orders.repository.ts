import { EntityRepository, Repository } from 'typeorm';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {}
