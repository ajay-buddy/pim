import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag-dto';
import { ThisMonthInstance } from 'twilio/lib/rest/api/v2010/account/usage/record/thisMonth';
import { Like } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async getAllTag(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async getMatchTag(key: string): Promise<Tag[]> {
    return this.tagRepository.find({
      name: Like(`%${key.toLowerCase()}%`),
    });
  }

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;

    const tag = new Tag();

    tag.name = name.toLowerCase();

    return tag.save();
  }

  async editTag(createTagDto: CreateTagDto, id: string): Promise<Tag> {
    const { name } = createTagDto;

    const tag = await this.tagRepository.findOne({ id });

    tag.name = name.toLowerCase();

    return tag.save();
  }

  async deleteTag(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ id });

    return tag.remove();
  }
}
