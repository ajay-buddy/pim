import { IsNotEmpty } from 'class-validator';
import { APPLICATIONSTAGE } from '../enum/application-stage.enum';

export class CreateApplicationDto {
  id?: string;
  applied_by?: string;
  job: string;
  stage?: APPLICATIONSTAGE;
}
