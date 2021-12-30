import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile-dto';
import { User } from 'src/auth/user.entity';
import { UserRepository } from '../auth/user.repository';
import { TagRepository } from '../tag/tag.repository';
import { USERTYPE } from 'src/auth/enum/user-type.enum';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async getAllProfile(page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    console.log('===>', take, skip);
    return await this.profileRepository.findAndCount({
      // where: {
      //   belongs_to: { user_type: USERTYPE.CANDIDATE },
      // },
      take: take,
      skip: skip,
      relations: ['belongs_to'],
    });
    // .filter(
    //   (profile) =>
    //     profile.belongs_to &&
    //     profile.belongs_to.user_type === USERTYPE.CANDIDATE,
    // );
  }

  async myProfile(user: User): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { belongs_to: user },
      relations: ['belongs_to'],
    });
  }

  async profileById(user: User, id: string): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['belongs_to'],
    });
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    const profile = new Profile();

    const blocked = ['user_id', 'tags'];

    const profileUser = await this.userRepository.findOne({
      id: createProfileDto.user_id,
    });

    if (createProfileDto.profile_tags) {
      const tags = await this.tagRepository.findByIds(
        createProfileDto.profile_tags,
      );

      profile.profile_tags = tags;
    }

    Object.keys(createProfileDto).forEach(
      (key) => (profile[key] = !blocked.includes(key) && createProfileDto[key]),
    );
    profile.belongs_to = profileUser || user;
    profile.created_by = user;
    profile.updated_by = user;
    return profile.save();
  }

  async editProfile(
    createProfileDto: CreateProfileDto,
    user: User,
    id: string,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ id });

    const blocked = ['user_id', 'tags'];

    const profileUser = await this.userRepository.findOne({
      id: createProfileDto.user_id,
    });

    if (createProfileDto.profile_tags) {
      const tags = await this.tagRepository.findByIds(
        createProfileDto.profile_tags,
      );

      profile.profile_tags = tags;
    }

    Object.keys(createProfileDto).forEach(
      (key) => (profile[key] = !blocked.includes(key) && createProfileDto[key]),
    );
    profile.updated_by = user;

    return profile.save();
  }

  async deleteProfile(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ id });

    return profile.remove();
  }
}
