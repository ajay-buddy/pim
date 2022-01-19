import { IsNotEmpty } from 'class-validator';

export class CreateStageDto {
  @IsNotEmpty()
  name: string;
}
