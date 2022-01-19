import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company-dto';
import { ThisMonthInstance } from 'twilio/lib/rest/api/v2010/account/usage/record/thisMonth';
import { Like } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async getAllCompany(name?: string): Promise<Company[]> {
    return this.companyRepository.find({ name: Like(`%${name}%`) });
  }

  async getMatchCompany(key: string): Promise<Company[]> {
    return this.companyRepository.find({
      name: Like(`%${key}%`),
    });
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { name } = createCompanyDto;

    const company = new Company();

    company.name = name;

    return company.save();
  }

  async editCompany(
    createcompanyDto: CreateCompanyDto,
    id: string,
  ): Promise<Company> {
    const { name } = createcompanyDto;

    const company = await this.companyRepository.findOne({ id });

    company.name = name;

    return company.save();
  }

  async deleteCompany(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ id });

    return company.remove();
  }
}
