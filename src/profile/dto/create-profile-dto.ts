import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  // @IsNotEmpty()
  id?: string;
  user_type?: string;
  name?: string;
  gender?: string;
  f_name?: string;
  m_name?: string;
  pan_number?: string;
  adhar_number?: string;
  dob?: string;
  phone?: string;
  code?: string;
  llPhone?: string;
  alternatePhone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  job_type?: string[];
  active?: boolean;
  engaged?: boolean;
  user_id?: string;
  experience?: number;
  current_ctc?: number;
  expected_ctc?: number;
  manager?: { id?: string; email?: 'string' };
  managee?: { id?: string; email?: 'string' }[];
  profile_tags?: { id?: string; name?: 'string' }[];
  profile_stags?: { id?: string; name?: 'string' }[];
  emp_code?: string;
  profile_status?: string;
  resumeUrl?: string;
  c_location?: string;
  p_location?: string;
  headline?: string;
  notice?: number;
  other_skills?: string;
}
