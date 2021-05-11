import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dto/create-order-dto';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('/:id')
  getOrdersById(@Param('id') id): Promise<Order> {
    return this.orderService.getOrdersById(id);
  }

  @Get('/:id')
  getOrdersByCustomerId(@Param('id') id): Promise<Order> {
    return this.orderService.getOrdersByCustomerId(id);
  }
}
