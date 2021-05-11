import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  price: number[];

  @IsNotEmpty()
  products: string[];

  @IsNotEmpty()
  quantity: number[];

  customerId: string;
}
