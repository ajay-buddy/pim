import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from './dto/create-tag-dto';
import { getManager, Like, SelectQueryBuilder } from 'typeorm';
import { UserRepository } from '../auth/user.repository';
import { ProfileRepository } from '../profile/profile.repository';
import { User } from '../auth/user.entity';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async getMyProfile(user: User) {
    return this.profileRepository.findOne({
      join: {
        alias: 'profiles',
      },
      where: (qb: SelectQueryBuilder<Profile>) => {
        qb.innerJoinAndSelect('profiles.belongs_to', 'users');
        qb.andWhere('users.id = :id', { id: user.id });
      },
      relations: ['belongs_to', 'managee'],
    });

    // const manager = getManager();
    // const tree = await manager.getTreeRepository(Profile).findRoots();
    // return tree;
  }
}
