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
import { CollageService } from './collage.service';
import { Collage } from './collage.entity';
import { CreateCollageDto } from './dto/create-collage-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('collage')
@UseGuards(AuthGuard('jwt'))
export class CollageController {
  constructor(private collageService: CollageService) {}

  @Get()
  getAllCollage(): Promise<Collage[]> {
    return this.collageService.getAllCollage();
  }

  @Get('/find')
  getMatchCollage(@Query('name') key: string): Promise<Collage[]> {
    return this.collageService.getMatchCollage(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createCollage(@Body() createCategoryDto: CreateCollageDto): Promise<Collage> {
    return this.collageService.createCollage(createCategoryDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editCollage(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCollageDto,
  ): Promise<Collage> {
    return this.collageService.editCollage(createCategoryDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteCollage(@Param('id') id: string): Promise<Collage> {
    return this.collageService.deleteCollage(id);
  }
}
