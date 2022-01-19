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
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
@UseGuards(AuthGuard('jwt'))
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  getAllTag(): Promise<Tag[]> {
    return this.tagService.getAllTag();
  }

  @Get('/find')
  getMatchTag(@Query('name') key: string): Promise<Tag[]> {
    return this.tagService.getMatchTag(key);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createTag(@Body() createCategoryDto: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(createCategoryDto);
  }

  @Post('/edit/:id')
  @UsePipes(ValidationPipe)
  editTag(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateTagDto,
  ): Promise<Tag> {
    return this.tagService.editTag(createCategoryDto, id);
  }

  @Post('/delete/:id')
  @UsePipes(ValidationPipe)
  deleteTag(@Param('id') id: string): Promise<Tag> {
    return this.tagService.deleteTag(id);
  }
}
