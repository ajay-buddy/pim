import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { USERTYPE } from './enum/user-type.enum';
import { ProfileRepository } from '../profile/profile.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,

    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    let login_user = null;
    console.log(authCredentialsDto);
    if (!!authCredentialsDto.user_id) {
      login_user = await this.userRepository.findOne({
        id: authCredentialsDto.user_id,
      });
    }
    return this.userRepository.signUp(authCredentialsDto, login_user);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; username: string; id: string }> {
    const { username, id } = await this.userRepository.ValidateUserPassword(
      authCredentialsDto,
    );

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, username, id };
  }

  async getCandidates(user: User): Promise<User[]> {
    return this.userRepository.find({ user_type: USERTYPE.CANDIDATE });
  }
}
