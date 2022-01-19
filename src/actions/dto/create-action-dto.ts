import { IsNotEmpty } from 'class-validator';

export class CreateActionDto {
  @IsNotEmpty()
  name: string;
}
