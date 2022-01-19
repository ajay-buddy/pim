import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Profile } from 'src/profile/profile.entity';
import { ProfileService } from '../profile/profile.service';
import { CreateProfileDto } from '../profile/dto/create-profile-dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    login_user: User,
    profileService: ProfileService,
  ): Promise<{ username: string }> {
    const { username, password, user_type } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = new User();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    user.user_type = user_type;
    try {
      const user_created = await user.save();
      if (authCredentialsDto.profile) {
        authCredentialsDto.profile.user_id = user_created.id;
        const profile = await profileService.createProfile(
          authCredentialsDto.profile,
          user_created,
        );
        user_created.profile = profile;
        user_created.save();
      } else {
        const data: CreateProfileDto = {
          id: null,
          user_type: user_created.user_type,
          name: user_created.username,
          email: user_created.username,
          user_id: user_created.id,
        };
        const profile = await profileService.createProfile(data, user_created);
        user_created.profile = profile;
        user_created.save();
      }
      return { username };
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async ValidateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string; id: string }> {
    const { username, password } = authCredentialsDto;

    try {
      const user = await this.findOne({ username });
      if (user && (await user.validatePassword(password))) {
        return { username: user.username, id: user.id };
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      console.log('err', err);
      throw new NotFoundException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
