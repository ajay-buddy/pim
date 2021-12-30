import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Profile } from 'src/profile/profile.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    login_user: User,
  ): Promise<void> {
    const { username, password, user_type } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = new User();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    user.user_type = user_type;
    try {
      const user_created = await user.save();
      const profile = new Profile();
      console.log(login_user, user_created);
      profile.belongs_to = user_created;
      profile.created_by = login_user || user_created;
      profile.updated_by = login_user || user_created;
      profile.email = username;
      await profile.save();
    } catch (error) {
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
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
