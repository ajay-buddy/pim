import { IsNotEmpty } from 'class-validator';
import { Product } from '../../products/products.entity';

export class CreateCatagoryDto {
  @IsNotEmpty()
  name: string;

  products: Product[];
}
