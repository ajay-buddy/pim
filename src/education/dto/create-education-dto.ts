import { IsNotEmpty } from 'class-validator';
import { EDUCATIONTYPE } from '../eunm/education-type.enum';

export class CreateEducationDto {
  name: string;
  start: string;
  end: string;
  collage_name: string;
  university_name: string;
  type: EDUCATIONTYPE;
  user_id?: string;
  id?: string;
  education_tags?: string[];
}
