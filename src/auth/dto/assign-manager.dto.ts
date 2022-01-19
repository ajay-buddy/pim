import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { USERTYPE } from '../enum/user-type.enum';

export class AssignManagerDto {
  manager: string;
  managee: string[];
}
