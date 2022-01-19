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
import { ActionService } from './action.service';
import { Action } from './action.entity';
import { CreateActionDto } from './dto/create-action-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('action')
@UseGuards(AuthGuard('jwt'))
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Get('/all')
  getAllAction(): Promise<Action[]> {
    return this.actionService.getAllAction();
  }

  @Get('/find')
  getMatchAction(@Query('name') key: string): Promise<Action[]> {
    return this.actionService.getMatchAction(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createAction(@Body() createCategoryDto: CreateActionDto): Promise<Action> {
    return this.actionService.createAction(createCategoryDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editAction(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateActionDto,
  ): Promise<Action> {
    return this.actionService.editAction(createCategoryDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteAction(@Param('id') id: string): Promise<Action> {
    return this.actionService.deleteAction(id);
  }
}
