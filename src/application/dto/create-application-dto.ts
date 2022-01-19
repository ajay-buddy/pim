import { IsNotEmpty } from 'class-validator';
import { APPLICATIONSTAGE } from '../enum/application-stage.enum';

export class CreateApplicationDto {
  id?: string;
  applicant?: { id?: string; email?: string; phone: string; name: string };
  job: { id?: string; job_id?: string };
  action: {
    id?: string;
    name?: string;
    date: string;
    created_by?: { name: string; email: string; id: string; emp_code: string };
  };
  job_id: string;
}
