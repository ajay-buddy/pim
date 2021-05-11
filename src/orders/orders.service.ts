import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { TransactionRepository } from '../transactions/transaction.repository';
import { ProductRepository } from 'src/products/products.repository';
import { In } from 'typeorm';
import { Transaction } from '../transactions/transactions.entity';
import { Order } from './orders.entity';
import { TRANSACTION_STATUS } from 'src/transactions/transaction-status.enum';
import { CreateOrderDto } from './dto/create-order-dto';
import { CustomerRepository } from 'src/customer/customer.repository';
import { Twilio } from 'twilio';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private orderRepository: OrdersRepository,
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}

  async sendMessage({ id }) {
    console.log(process.env);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    const myNumber = process.env.MY_NUMBER;
    const client = new Twilio(accountSid, authToken);

    const message = await client.messages.create({
      from: twilioNumber,
      to: myNumber,
      body: `Your Order is placed successfully! Please visit the link for order details. https://localhost:3001/orders/${id}`,
    });
  }

  async createTransaction(d, p) {
    const trans = new Transaction();
    console.log('===>', d);
    trans.product = d;
    trans.price = p;
    trans.direction = TRANSACTION_STATUS.INWARD;
    return await trans.save();
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { products, quantity, customerId, price } = createOrderDto;
    const data = await this.productRepository.find({
      id: In(products),
    });

    if (!data.length) throw new BadRequestException();
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].quantity < quantity[i]) {
    //     throw new BadRequestException();
    //   }
    // }

    const t = [];

    for (let i = 0; i < data.length; i++) {
      data[i].quantity -= quantity[i];
      await data[i].save();
      t[i] = await this.transactionRepository.createTransaction(
        data[i],
        price[i],
        quantity[i],
        TRANSACTION_STATUS.OUTWARD,
      );
    }
    const purch = new Order();
    purch.customer = await this.customerRepository.findOne({ id: customerId });
    purch.transactions = t;
    const purchase = await purch.save();
    // this.sendMessage({ id: purch.id });
    return purchase;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: [
        'customer',
        'transactions',
        'transactions.product',
        'transactions.product.catagory',
      ],
    });
  }

  async getOrdersById(id: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: {
        id,
      },
      relations: [
        'customer',
        'transactions',
        'transactions.product',
        'transactions.product.catagory',
      ],
    });
  }

  async getOrdersByCustomerId(id: string): Promise<Order> {
    const customer = await this.customerRepository.findOne({ id });
    return this.orderRepository.findOne({
      where: {
        customer,
      },
      relations: [
        'customer',
        'transactions',
        'transactions.product',
        'transactions.product.catagory',
      ],
    });
  }
}
