import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  customerId: number;
}
