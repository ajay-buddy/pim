import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { USERTYPE } from '../enum/user-type.enum';

export class ChangeManagerDto {
  manager: string;
  managee: string;
}
