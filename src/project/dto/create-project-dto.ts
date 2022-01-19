import { IsNotEmpty } from 'class-validator';
import { PROJECTTYPE } from 'src/job/enum/employment_type.enum';

export class CreateProjectDto {
  name: string;
  start: string;
  end: string;
  description: string;
  company_name: string;
  project_company: string;
  type: PROJECTTYPE;
  project_tags: string[];
  user_id?: string;
  id?: string;
}
