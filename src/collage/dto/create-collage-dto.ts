import { IsNotEmpty } from 'class-validator';

export class CreateCollageDto {
  @IsNotEmpty()
  name: string;
}
