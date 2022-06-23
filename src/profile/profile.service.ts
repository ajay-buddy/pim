import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile-dto';
import { User } from 'src/auth/user.entity';
import { UserRepository } from '../auth/user.repository';
import { TagRepository } from '../tag/tag.repository';
import { USERTYPE } from 'src/auth/enum/user-type.enum';
import {
  getManager,
  getRepository,
  In,
  Like,
  SelectQueryBuilder,
} from 'typeorm';
import { CandidateFilterDto } from './dto/candidate-filter.dto';
import { Tag } from 'src/tag/tag.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) { }

  async findAllProfile(type: string, name: string) {
    return await this.profileRepository.find({
      join: {
        alias: 'profiles',
      },

      where: (qb: SelectQueryBuilder<Profile>) => {
        qb.where('profiles.user_type = :type', {
          type: type.toUpperCase(),
        });
        qb.andWhere('LOWER(profiles.name) LIKE(:name)', {
          name: `${name.toLowerCase()}%`,
        });
        // qb.where('profiles.email LIKE(:name)', { name: `${name}%` });
      },
      relations: [],
    });
  }

  async getAllProfile(
    type: string,
    page: string,
    limit: string,
    name: string,
    p_tags: string,
    s_tags: string,
    email: string,

    phone: string,
    c_location: string,
    p_location: string,
    min_experience: string,
    max_experience: string,
    min_current_ctc: string,
    headline: string,
    max_notice: string,
    min_notice: string,
    max_expected_ctc: string,
    min_expected_ctc: string,
    max_current_ctc: string,
  ) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    const query = getRepository(Profile);

    return await this.profileRepository.findAndCount({
      join: {
        alias: 'profiles',
      },

      where: (qb: SelectQueryBuilder<Profile>) => {
        // qb.innerJoinAndSelect('profiles.belongs_to', 'users');
        qb.where('profiles.user_type = :type', {
          type: type.toUpperCase(),
        });
        if (name) {
          qb.andWhere('LOWER(profiles.name) LIKE(:name)', {
            name: `%${name.toLowerCase()}%`,
          });
        }
        if (phone) {
          qb.andWhere('profiles.phone LIKE(:phone)', { phone: `%${phone}%` });
        }

        if (min_experience) {
          qb.andWhere('profiles.experience >= :min_experience', {
            min_experience: min_experience,
          });
        }
        if (max_experience) {
          qb.andWhere('profiles.experience <= :min_experience', {
            max_experience: max_experience,
          });
        }

        if (min_current_ctc) {
          qb.andWhere('profiles.current_ctc >= :min_current_ctc', {
            min_current_ctc: min_current_ctc,
          });
        }
        if (max_current_ctc) {
          qb.andWhere('profiles.current_ctc <= :min_current_ctc', {
            max_current_ctc: max_current_ctc,
          });
        }

        if (min_expected_ctc) {
          qb.andWhere('profiles.expected_ctc >= :min_expected_ctc', {
            min_expected_ctc: min_expected_ctc,
          });
        }
        if (max_expected_ctc) {
          qb.andWhere('profiles.expected_ctc <= :min_expected_ctc', {
            max_expected_ctc: max_expected_ctc,
          });
        }
        if (min_notice) {
          qb.andWhere('profiles.notice >= :min_notice', {
            min_notice: min_notice,
          });
        }
        if (max_notice) {
          qb.andWhere('profiles.notice <= :min_notice', {
            max_notice: max_notice,
          });
        }

        if (headline) {
          qb.andWhere('LOWER(profiles.headline) LIKE(:headline)', {
            headline: `%${headline.toLowerCase()}%`,
          });
        }
        if (c_location) {
          qb.andWhere('profiles.c_location LIKE(:c_location)', {
            c_location: `%${c_location}%`,
          });
        }
        if (p_location) {
          qb.andWhere('profiles.p_location LIKE(:p_location)', {
            p_location: `%${p_location}%`,
          });
        }

        if (email) {
          qb.andWhere('LOWER(profiles.email) LIKE(:email)', {
            email: `%${email.toLowerCase()}%`,
          });
        }
        if (p_tags) {
          qb.innerJoinAndSelect('profiles.profile_tags', 'p_tags');
          const tags = p_tags.split(',')?.map((d) => d);
          qb.where('p_tags.id IN(:...tags)', { tags: tags });
        }
        if (s_tags) {
          qb.innerJoinAndSelect('profiles.profile_stags', 's_tags');
          const tags = s_tags.split(',')?.map((d) => d);
          qb.where('s_tags.id IN(:...tags)', { tags: tags });
        }
      },
      take: take,
      skip: skip,
      relations: ['belongs_to', 'manager', 'managee'],
    });
  }
  async getCandidateProfile(page?: string, limit?: string) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;
    return await this.profileRepository.findAndCount({
      join: { alias: 'profiles', innerJoin: { users: 'profiles.belongs_to' } },
      where: (qb) => {
        qb.where('users.user_type = :type', { type: USERTYPE.CANDIDATE });
        // .andWhere('users.user_type = :type', { type: USERTYPE.CANDIDATE });
      },
      take: take,
      skip: skip,
      relations: ['belongs_to', 'belongs_to.manager', 'belongs_to.managee'],
    });
  }

  async getFiltedCandidateProfile(
    candidateFilterDto: CandidateFilterDto,
    page?: string,
    limit?: string,
  ) {
    const take = 100;
    const skip = (parseInt(page) - 1) * take || 0;
    return await this.profileRepository.findAndCount({
      join: { alias: 'profiles', innerJoin: { users: 'profiles.belongs_to' } },
      where: (qb) => {
        qb.where('users.user_type = :type', { type: USERTYPE.CANDIDATE });
        // .andWhere('users.user_type = :type', { type: USERTYPE.CANDIDATE });
      },
      take: take,
      skip: skip,
      relations: ['belongs_to', 'belongs_to.manager', 'belongs_to.managee'],
    });
  }

  async getAdminProfile(page?: string, limit?: string, email?: string) {
    console.log(email);
    const take = 100;
    const skip = (parseInt(page) - 1) * take || 0;
    return await this.profileRepository.findAndCount({
      join: { alias: 'profiles', innerJoin: { users: 'profiles.belongs_to' } },
      where: (qb) => {
        qb.where('users.user_type = :type', { type: USERTYPE.ADMIN });
        if (email) {
          qb.andWhere('email like :email', { email: `%${email}%` });
        }
        // .andWhere('users.user_type = :type', { type: USERTYPE.CANDIDATE });
      },
      take: take,
      skip: skip,
      relations: ['belongs_to', 'belongs_to.manager', 'belongs_to.managee'],
    });
  }

  async myProfile(user: User): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { belongs_to: user },
      relations: ['belongs_to', 'belongs_to.manager', 'belongs_to.managee'],
    });
  }

  async profileById(user: User, id: string): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['belongs_to', 'belongs_to.manager', 'belongs_to.managee'],
    });
  }

  async createBulkProfile(createProfileDto: CreateProfileDto[], user: User) {
    const success = [];
    const failed = [];

    for (let i = 0; i < createProfileDto.length; i++) {
      try {
        await this.createProfile(createProfileDto[i], user);
        success.push(createProfileDto[i]);
      } catch (err) {
        console.log(err);
        failed.push(createProfileDto[i]);
      }
    }
    return { success, failed };
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    const manager = getManager();
    let profile = null;
    if (createProfileDto.id) {
      console.log(createProfileDto, profile);
      profile = await this.profileRepository.findOne({
        id: createProfileDto.id,
      });
    } else {
      const found = await this.profileRepository.findOne({email: createProfileDto.email});
      if(found) {
        profile = found;
      } else {
        profile = new Profile();
        profile.created_by = user;
      }
    }
    console.log(createProfileDto, createProfileDto.user_type, user.user_type);
    profile.user_type = createProfileDto.user_type || user.user_type;

    const profileUser = await this.userRepository.findOne({
      id: createProfileDto.user_id,
    });

    const tags: string[] = [];
    const s_tags: string[] = [];
    const tags_create: string[] = [];
    const s_tags_create: string[] = [];
    createProfileDto?.profile_tags?.map((t) => {
      if (t.id) {
        tags.push(t.id);
      } else {
        tags_create.push(t.name);
      }
    });

    createProfileDto?.profile_stags?.map((t) => {
      if (t.id) {
        s_tags.push(t.id);
      } else {
        s_tags_create.push(t.name);
      }
    });

    if (tags_create) {
      for (let i = 0; i < tags_create.length; i++) {
        const found = await this.tagRepository.findOne({
          name: tags_create[i],
        });
        if (found) {
          tags.push(found.id);
        } else {
          const tag = new Tag();
          tag.name = tags_create[i];
          const result = await tag.save();
          tags.push(result.id);
        }
      }
    }

    if (s_tags_create) {
      for (let i = 0; i < s_tags_create.length; i++) {
        const found = await this.tagRepository.findOne({
          name: s_tags_create[i],
        });
        if (found) {
          s_tags.push(found.id);
        } else {
          const tag = new Tag();
          tag.name = s_tags_create[i];
          const result = await tag.save();
          s_tags.push(result.id);
        }
      }
    }

    if (tags) {
      const tagList = await this.tagRepository.findByIds(tags);

      profile.profile_tags = tagList;
    }
    if (s_tags) {
      const tagList = await this.tagRepository.findByIds(s_tags);

      profile.profile_stags = tagList;
    }

    if (createProfileDto.manager) {
      const manager = createProfileDto.manager.id
        ? await this.profileRepository.findOne({
          id: createProfileDto.manager.id,
        })
        : await this.profileRepository.findOne({
          email: createProfileDto.manager.email,
        });
      profile.manager = manager;
    }

    profile.belongs_to = profileUser;
    profile.name = createProfileDto.name;
    profile.email = createProfileDto.email;
    profile.resumeUrl = createProfileDto.resumeUrl;
    profile.phone = createProfileDto.phone;

    profile.c_location = createProfileDto.c_location;
    profile.p_location = createProfileDto.p_location;
    profile.experience = createProfileDto.experience;
    profile.current_ctc = createProfileDto.current_ctc;
    profile.expected_ctc = createProfileDto.expected_ctc;
    profile.headline = createProfileDto.headline;
    profile.notice = createProfileDto.notice;
    profile.other_skills = createProfileDto.other_skills;

    profile.emp_code = createProfileDto.emp_code;
    profile.profile_status = createProfileDto.profile_status;

    profile.updated_by = user;
    return manager.save(profile);
    // return profile.save();
  }

  async editProfile(
    createProfileDto: CreateProfileDto,
    user: User,
    id: string,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ id });

    const blocked = ['user_id', 'profile_tags'];

    const profileUser = await this.userRepository.findOne({
      id: createProfileDto.user_id,
    });
    Object.keys(createProfileDto).forEach(
      (key) => (profile[key] = !blocked.includes(key) && createProfileDto[key]),
    );

    if (createProfileDto.profile_tags) {
      const tags = await this.tagRepository.findByIds(
        createProfileDto.profile_tags,
      );
      console.log(createProfileDto.profile_tags, tags);
      profile.profile_tags = tags;
    }

    profile.updated_by = user;

    return profile.save();
  }

  async deleteProfile(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ id });

    return profile.remove();
  }
}
