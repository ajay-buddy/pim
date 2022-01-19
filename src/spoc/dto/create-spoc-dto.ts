import { IsNotEmpty } from 'class-validator';

export class CreateSpocDto {
  // @IsNotEmpty()
  id?: string;
  name: string;
  company: { id?: string; name: string; label?: string };
  email: string;
  recruiters?: { id: string; email: string; name?: string }[];
  owner?: { id: string; email: string; name?: string };
  spoc_id: string;
  phone: string;
  status: string;
}
