import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { USERTYPE } from './enum/user-type.enum';
import { ProfileRepository } from '../profile/profile.repository';
import { AssignManagerDto } from './dto/assign-manager.dto';
import { ChangeManagerDto } from './dto/change-manager.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,

    private jwtService: JwtService,
    private profileService: ProfileService,
  ) { }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string }> {
    let login_user = null;
    console.log(authCredentialsDto);
    if (!!authCredentialsDto.user_id) {
      login_user = await this.userRepository.findOne({
        id: authCredentialsDto.user_id,
      });
    }
    return this.userRepository.signUp(
      authCredentialsDto,
      login_user,
      this.profileService,
    );
  }

  async signUpBulk(authCredentialsDtoBulk: AuthCredentialsDto[]) {
    const success = [];
    const failed = [];
    for (let i = 0; i < authCredentialsDtoBulk.length; i++) {
      try {
        await this.signUp(authCredentialsDtoBulk[i]);
        success.push(authCredentialsDtoBulk[i]);
      } catch (err) {
        console.log(err);
        failed.push(authCredentialsDtoBulk[i]);
      }
    }
    return {
      success,
      failed,
    };
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; username: string; id: string }> {
    const { username, id } = await this.userRepository.ValidateUserPassword(
      authCredentialsDto,
    );

    const payload = { username };
    const accessToken = this.jwtService.sign(payload);
    console.log(accessToken);
    return { accessToken, username, id };
  }

  async getCandidates(user: User): Promise<User[]> {
    return this.userRepository.find({ user_type: USERTYPE.CANDIDATE });
  }

  async getAdmins(user: User): Promise<User[]> {
    return this.userRepository.find({
      where: { user_type: USERTYPE.ADMIN },
      relations: ['reports_to', 'reported_by'],
    });
  }

  async changeManger(
    user: User,
    changeManagerDto: ChangeManagerDto,
  ): Promise<User> {
    const manager = await this.userRepository.findOne(changeManagerDto.manager);
    const managee = await this.userRepository.findOne(changeManagerDto.managee);
    managee.manager = manager;

    // await manager.save();
    console.log(manager, managee);
    return managee.save();
  }

  async assignManager(
    user: User,
    assignManagerDto: AssignManagerDto,
  ): Promise<User> {
    const managee = await this.userRepository.findByIds(
      assignManagerDto.managee,
    );
    const manager = await this.userRepository.findOne({
      id: assignManagerDto.manager,
    });

    manager.managee = managee;

    const t = await manager.save();

    console.log(t, t.managee, t.managee[0].manager);
    return t;
  }

  async dashboard(user: User) {
    const data1 = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['managee', 'managee.profile'],
    });

    const data = await this.profileRepository.find({
      where: {
        belongs_to: {
          id: user.id,
        },
      },
      relations: [
        'belongs_to',
        'belongs_to.managee',
        'belongs_to.managee.profile',
      ],
    });
    console.log('===>', data);
    return data;
  }
}
