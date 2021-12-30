import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationController } from './organisation.controller';
import { OrganisationRepository } from './organisation.repository';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationRepository])],
  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule {}
