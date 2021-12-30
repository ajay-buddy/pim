import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { Organisation } from './organisation.entity';
import { CreateOrganisationDto } from './dto/create-organisation-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('organisation')
@UseGuards(AuthGuard('jwt'))
export class OrganisationController {
  constructor(private organisationService: OrganisationService) {}

  @Get()
  getAllOrganisation(): Promise<Organisation[]> {
    return this.organisationService.getAllCategory();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createCategoryDto: CreateOrganisationDto,
  ): Promise<Organisation> {
    return this.organisationService.createOrganisation(createCategoryDto);
  }
}
