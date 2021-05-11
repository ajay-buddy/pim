import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseRepository } from './purchase.repository';
import { TransactionRepository } from '../transactions/transaction.repository';
import { ProductRepository } from 'src/products/products.repository';
import { In } from 'typeorm';
import { Transaction } from '../transactions/transactions.entity';
import { Purchase } from './purchase.entity';
import { TRANSACTION_STATUS } from 'src/transactions/transaction-status.enum';
import { CreateProductDto } from 'src/products/dto/create-product-dto';
import { CreatePurchaseDto } from './dto/create-purchase-dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { VendorsRepository } from '../vendors/vendors.repository';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectQueue('test-producer')
    private testQueue: Queue,
    @InjectRepository(PurchaseRepository)
    private purchaseRepository: PurchaseRepository,
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(VendorsRepository)
    private vendorsRepository: VendorsRepository,
  ) {}

  private readonly logger = new Logger(PurchaseService.name);

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    this.logger.log('Register Queue');
    // const job = this.testQueue.add('test', {
    //   foo: 'bar',
    // });

    const { products, price, quantity, vendorId } = createPurchaseDto;
    const data = await this.productRepository.find({
      id: In(products),
    });

    const t = [];

    for (let i = 0; i < data.length; i++) {
      data[i].quantity += quantity[i];
      await data[i].save();
      t[i] = await this.transactionRepository.createTransaction(
        data[i],
        price[i],
        quantity[i],
        TRANSACTION_STATUS.INWARD,
      );
    }
    const purch = new Purchase();
    purch.transactions = t;
    const vendor = await this.vendorsRepository.findOne({ id: vendorId });
    purch.vendor = vendor;
    return purch.save();
  }

  async getAllPurchase(): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      relations: [
        'vendor',
        'transactions',
        'transactions.product',
        'transactions.product.catagory',
      ],
    });
  }
  async getAllPurchaseByVendorId(id: string): Promise<Purchase[]> {
    const vendor = await this.vendorsRepository.findOne({ id });
    return this.purchaseRepository.find({
      where: {
        vendor,
      },
      relations: [
        'vendor',
        'transactions',
        'transactions.product',
        'transactions.product.catagory',
      ],
    });
  }

  async getAllPurchaseByPurchaseId(id: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: {
        id,
      },
      relations: [
        'vendor',
        'transactions',
        'transactions.product',
        'transactions.product.catagory',
      ],
    });
  }
}
