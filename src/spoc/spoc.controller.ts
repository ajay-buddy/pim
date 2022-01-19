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
import { SpocService } from './spoc.service';
import { Spoc } from './spoc.entity';
import { CreateSpocDto } from './dto/create-spoc-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('spoc')
@UseGuards(AuthGuard('jwt'))
export class SpocController {
  constructor(private spocService: SpocService) {}

  @Get('/all')
  getAllSpoc(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('phone') phone: string,
    @Query('company') company: string,
    @Query('owner') owner: string,
    @Query('recruiters') recruiters: string,
  ) {
    return this.spocService.getAllSpoc(
      page,
      limit,
      name,
      email,
      phone,
      company,
      owner,
      recruiters,
    );
  }

  @Get('/find')
  getMatchSpoc(@Query('name') key: string): Promise<Spoc[]> {
    return this.spocService.getMatchSpoc(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createSpoc(@Body() createSpocDto: CreateSpocDto): Promise<Spoc> {
    return this.spocService.createSpoc(createSpocDto);
  }

  @Post('/create/bulk')
  @UsePipes(ValidationPipe)
  createSpocBulk(@Body() createSpocDto: CreateSpocDto[]) {
    return this.spocService.createSpocBulk(createSpocDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editSpoc(
    @Param('id') id: string,
    @Body() createSpocDto: CreateSpocDto,
  ): Promise<Spoc> {
    return this.spocService.editSpoc(createSpocDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteSpoc(@Param('id') id: string): Promise<Spoc> {
    return this.spocService.deleteSpoc(id);
  }
}
