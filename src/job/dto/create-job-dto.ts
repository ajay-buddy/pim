import { IsNotEmpty } from 'class-validator';
import { EMPLOYMENTTYPE } from '../enum/employment_type.enum';

export class CreateJobDto {
  @IsNotEmpty()
  name: string;
  description: string;
  company_name: string;
  type: EMPLOYMENTTYPE;
  is_active: boolean;
  vacancies: number;
  id?: string;
}
