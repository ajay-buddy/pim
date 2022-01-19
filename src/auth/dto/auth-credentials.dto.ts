import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { USERTYPE } from '../enum/user-type.enum';
import { CreateProfileDto } from '../../profile/dto/create-profile-dto';

export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak!!',
  })
  password: string;
  user_type: USERTYPE;
  user_id?: string;
  profile?: CreateProfileDto;
}
