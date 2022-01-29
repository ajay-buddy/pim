import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spoc } from './spoc.entity';
import { SpocRepository } from './spoc.repository';
import { CreateSpocDto } from './dto/create-spoc-dto';
import { Like, SelectQueryBuilder } from 'typeorm';
import { CompanyRepository } from 'src/company/company.repository';
import { Company } from 'src/company/company.entity';
import { ProfileRepository } from '../profile/profile.repository';

@Injectable()
export class SpocService {
  constructor(
    @InjectRepository(SpocRepository)
    private spocRepository: SpocRepository,

    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,

    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async getAllSpoc(
    page: string,
    limit: string,
    name: string,
    email: string,
    phone: string,
    company: string,
    owner: string,
    recruiters: string,
  ) {
    const take = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * take || 0;

    return this.spocRepository.findAndCount({
      join: {
        alias: 'spoc',
      },

      where: (qb: SelectQueryBuilder<Spoc>) => {
        if (name) {
          qb.andWhere('LOWER(spoc.name) LIKE(:name)', {
            name: `%${name.toLowerCase()}%`,
          });
        }
        if (email) {
          qb.andWhere('LOWER(spoc.email) LIKE(:email)', {
            email: `%${email.toLowerCase()}%`,
          });
        }
        if (phone) {
          qb.andWhere('spoc.phone LIKE(:phone)', { phone: `%${phone}%` });
        }
        if (owner) {
          qb.innerJoinAndSelect('spoc.owner', 'ownerProfiles');
          qb.andWhere('ownerProfiles.id IN(:...owner)', {
            owner: owner.split(',')?.map((d) => d),
          });
        }
        if (recruiters) {
          qb.innerJoinAndSelect('spoc.recruiters', 'recruitersProfiles');
          qb.andWhere('recruitersProfiles.id IN(:...recruiters)', {
            recruiters: recruiters.split(',')?.map((d) => d),
          });
        }
        if (company) {
          qb.innerJoinAndSelect('spoc.company', 'companies');
          qb.andWhere('companies.id IN(:...company)', {
            company: company.split(',')?.map((d) => d),
          });
        }
      },
      take: take,
      skip: skip,
      relations: ['company', 'recruiters', 'owner'],
    });
  }

  async getMatchSpoc(key: string): Promise<Spoc[]> {
    return this.spocRepository.find({
      name: Like(`%${key}%`),
    });
  }
  async createSpocBulk(createSpocDto: CreateSpocDto[]) {
    const success = [];
    const failed = [];
    for (let i = 0; i < createSpocDto.length; i++) {
      try {
        await this.createSpoc(createSpocDto[i]);
        success.push(createSpocDto[i]);
      } catch (err) {
        console.log(err);
        failed.push(createSpocDto[i]);
      }
    }

    return { success, failed };
  }
  async createSpoc(createSpocDto: CreateSpocDto): Promise<Spoc> {
    const {
      id,
      name,
      company,
      email,
      recruiters,
      status,
      phone,
      spoc_id,
      owner,
    } = createSpocDto;

    let spoc = null;
    if (id) {
      spoc = await this.spocRepository.findOne({ id });
    } else {
      spoc = new Spoc();
    }

    if (company.id) {
      const comp = await this.companyRepository.findOne({ id: company.id });
      spoc.company = comp;
    } else if (company.name) {
      const comp = await this.companyRepository.findOne({ name: company.name });
      if (comp) {
        spoc.company = comp;
      } else {
        const comp = new Company();
        comp.name = company.name;
        spoc.company = await comp.save();
      }
    }

    spoc.name = name;
    spoc.email = email;
    spoc.status = status;
    spoc.phone = phone;
    spoc.spoc_id = spoc_id;
    if (owner) {
      if (owner.id) {
        const found = await this.profileRepository.findOne({
          id: owner.id,
        });
        if (found) {
          spoc.owner = found;
        }
      } else if (owner.email) {
        const found = await this.profileRepository.findOne({
          email: owner.email,
        });

        if (found) {
          spoc.owner = found;
        }
      } else if (owner.name) {
        const found = await this.profileRepository.findOne({
          name: owner.name,
        });
        if (found) {
          spoc.owner = found;
        }
      }
    }
    if (recruiters) {
      if (!spoc.recruiters) {
        spoc.recruiters = [];
      }
      for (let i = 0; i < recruiters.length; i++) {
        if (recruiters[i].id) {
          const found = await this.profileRepository.findOne({
            id: recruiters[i].id,
          });
          found && spoc.recruiters.push(found);
        } else if (recruiters[i].email) {
          const found = await this.profileRepository.findOne({
            email: recruiters[i].email,
          });
          found && spoc.recruiters.push(found);
        } else if (recruiters[i].name) {
          const found = await this.profileRepository.findOne({
            name: recruiters[i].name,
          });
          found && spoc.recruiters.push(found);
        }
      }
    }
    return spoc.save();
  }

  async editSpoc(createSpocDto: CreateSpocDto, id: string): Promise<Spoc> {
    const { name, company, email } = createSpocDto;

    const spoc = await this.spocRepository.findOne({ id });

    console.log(company);

    spoc.name = name;
    spoc.email = email;

    return spoc.save();
  }

  async deleteSpoc(id: string): Promise<Spoc> {
    console.log(id);
    const Spoc = await this.spocRepository.find({ id });

    return Spoc[1];
  }
}
