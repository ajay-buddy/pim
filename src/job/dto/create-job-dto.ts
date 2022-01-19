import { IsNotEmpty } from 'class-validator';
import { EMPLOYMENTTYPE } from '../enum/employment_type.enum';

export class CreateJobDto {
  @IsNotEmpty()
  name: string;
  description: string;
  company_name: string;
  spoc: { id?: string; email: string; label?: string; spoc_id: string };
  job_tags: { id?: string; name: 'string' }[];
  type: string;
  is_active: boolean;
  vacancies: number;
  id?: string;
  req_id: string;
  submited_by: string;
  priority: string;
  req_date: Date;
}
