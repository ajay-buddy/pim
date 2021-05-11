import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
@UseGuards(AuthGuard('jwt'))
export class CustomerController {
  constructor(private customersService: CustomerService) {}

  @Get()
  getAllCustomer(): Promise<Customer[]> {
    return this.customersService.getAllCustomer();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto);
  }
}
