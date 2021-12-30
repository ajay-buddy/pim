import { IsNotEmpty } from 'class-validator';
import { Product } from '../../products/products.entity';

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string;
}
