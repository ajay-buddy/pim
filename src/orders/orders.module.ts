import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customer/customer.repository';
import { ProductRepository } from 'src/products/products.repository';
import { TransactionRepository } from 'src/transactions/transaction.repository';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    TypeOrmModule.forFeature([TransactionRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
    TypeOrmModule.forFeature([CustomerRepository]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
