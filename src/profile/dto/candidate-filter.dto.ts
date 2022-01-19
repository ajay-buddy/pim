import { IsNotEmpty } from 'class-validator';

export class CandidateFilterDto {
  tags: string[];
  emails: string[];
  names: string[];
  experience: string;
  education: string;
  ctc: {
    high: string;
    low: string;
  };
  company: string[];
  university: string[];
  collage: string[];
  course: string[];
}
