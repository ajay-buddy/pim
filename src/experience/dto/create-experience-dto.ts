import { IsNotEmpty } from 'class-validator';
import { EMPLOYMENTTYPE } from 'src/job/enum/employment_type.enum';

export class CreateExperienceDto {
  start: string;
  end: string;
  description: string;
  company_name: string;
  type: EMPLOYMENTTYPE;
  is_present: boolean;
  experience_tags: string[];
  user_id: string;
  id?: string;
}
