import { IsNotEmpty } from 'class-validator';
import { Vendors } from '../../vendors/vendors.entity';

export class CreatePurchaseDto {
  @IsNotEmpty()
  price: number[];

  @IsNotEmpty()
  products: string[];

  @IsNotEmpty()
  quantity: number[];

  vendorId: string;
}
