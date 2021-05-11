import { IsNotEmpty } from 'class-validator';
import { Catagory } from '../../catagory/catagory.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  sku: string;
  @IsNotEmpty()
  price: number;
  pprice: number;
  sprice: number;
  @IsNotEmpty()
  catagoryId: string;
  cgst: number;
  igst: number;
  quantity: number;
}

export class EditProductDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  sku: string;
  @IsNotEmpty()
  price: number;
  pprice: number;
  sprice: number;
  @IsNotEmpty()
  catagoryId: string;
  cgst: number;
  igst: number;
  quantity: number;
}
