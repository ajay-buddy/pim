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
import { StageService } from './stage.service';
import { Stage } from './stage.entity';
import { CreateStageDto } from './dto/create-stage-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('stage')
@UseGuards(AuthGuard('jwt'))
export class StageController {
  constructor(private stageService: StageService) {}

  @Get()
  getAllStage(): Promise<Stage[]> {
    return this.stageService.getAllStage();
  }

  @Get('/find')
  getMatchStage(@Query('name') key: string): Promise<Stage[]> {
    return this.stageService.getMatchStage(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createStage(@Body() createCategoryDto: CreateStageDto): Promise<Stage> {
    return this.stageService.createStage(createCategoryDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editStage(
    @Param('id') id: string,
    @Body() createStageDto: CreateStageDto,
  ): Promise<Stage> {
    return this.stageService.editStage(createStageDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteStage(@Param('id') id: string): Promise<Stage> {
    return this.stageService.deleteStage(id);
  }
}
