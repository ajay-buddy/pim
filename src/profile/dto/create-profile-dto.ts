import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  // @IsNotEmpty()
  first_name: string;
  last_name: string;
  gender: string;
  f_name: string;
  m_name: string;
  pan_number: string;
  adhar_number: string;
  dob: string;
  phone: string;
  code: string;
  llPhone: string;
  alternatePhone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  job_type: string[];
  active: boolean;
  engaged: boolean;
  user_id: string;
  profile_tags: string[];
  id?: string;
}
