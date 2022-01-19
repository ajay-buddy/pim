import { IsNotEmpty } from 'class-validator';
import { APPLICATIONSTAGE } from '../enum/application-stage.enum';

export class CreateApplicationActivityDto {
  action?: string;
  stage?: string;
  description?: string;
}
