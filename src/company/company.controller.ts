import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('/all')
  getAllCompany(@Query('name') name: string): Promise<Company[]> {
    return this.companyService.getAllCompany(name);
  }

  @Get('/find')
  getMatchCompany(@Query('name') key: string): Promise<Company[]> {
    return this.companyService.getMatchCompany(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCategoryDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(createCategoryDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editCompany(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.companyService.editCompany(createCategoryDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteCompany(@Param('id') id: string): Promise<Company> {
    return this.companyService.deleteCompany(id);
  }
}
