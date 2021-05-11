import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { Catagory } from './catagory.entity';
import { CreateCatagoryDto } from './dto/create-catagory-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('catagory')
@UseGuards(AuthGuard('jwt'))
export class CatagoryController {
  constructor(private catagoryService: CatagoryService) {}

  @Get()
  getAllCatagory(): Promise<Catagory[]> {
    return this.catagoryService.getAllCategory();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createCategoryDto: CreateCatagoryDto,
  ): Promise<Catagory> {
    return this.catagoryService.createCatagory(createCategoryDto);
  }
}
