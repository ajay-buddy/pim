import { IsNotEmpty } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  name: string;
}
