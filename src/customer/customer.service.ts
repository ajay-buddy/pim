import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer-dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { name, customerId } = createCustomerDto;
    const customer = new Customer();
    customer.name = name;

    await customer.save();
    return customer;
  }
}
