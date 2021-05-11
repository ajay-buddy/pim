import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
