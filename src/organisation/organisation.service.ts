import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organisation } from './organisation.entity';
import { OrganisationRepository } from './organisation.repository';
import { CreateOrganisationDto } from './dto/create-organisation-dto';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(OrganisationRepository)
    private organisationRepository: OrganisationRepository,
  ) {}

  async getAllCategory(): Promise<Organisation[]> {
    return this.organisationRepository.find();
  }

  async createOrganisation(
    createOrganisationDto: CreateOrganisationDto,
  ): Promise<Organisation> {
    const { name } = createOrganisationDto;

    const organisation = new Organisation();

    organisation.name = name;

    return organisation.save();
  }
}
