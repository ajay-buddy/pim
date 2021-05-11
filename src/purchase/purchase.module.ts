import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductRepository } from 'src/products/products.repository';
import { TransactionRepository } from 'src/transactions/transaction.repository';
import { VendorsRepository } from 'src/vendors/vendors.repository';
import { PurchaseController } from './purchase.controller';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';
// import TestConsumer from './tasks';
@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseRepository]),
    TypeOrmModule.forFeature([TransactionRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
    TypeOrmModule.forFeature([VendorsRepository]),
    BullModule.registerQueue({
      name: 'test-producer',
      processors: [join(__dirname, 'tasks.js')],
    }),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
