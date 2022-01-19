import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collage } from './collage.entity';
import { CollageRepository } from './collage.repository';
import { CreateCollageDto } from './dto/create-collage-dto';
import { Like } from 'typeorm';

@Injectable()
export class CollageService {
  constructor(
    @InjectRepository(CollageRepository)
    private collageRepository: CollageRepository,
  ) {}

  async getAllCollage(): Promise<Collage[]> {
    return this.collageRepository.find();
  }

  async getMatchCollage(key: string): Promise<Collage[]> {
    return this.collageRepository.find({
      name: Like(`%${key}%`),
    });
  }

  async createCollage(createCollageDto: CreateCollageDto): Promise<Collage> {
    const { name } = createCollageDto;

    const collage = new Collage();

    collage.name = name;

    return collage.save();
  }

  async editCollage(
    createCollageDto: CreateCollageDto,
    id: string,
  ): Promise<Collage> {
    const { name } = createCollageDto;

    const collage = await this.collageRepository.findOne({ id });

    collage.name = name;

    return collage.save();
  }

  async deleteCollage(id: string): Promise<Collage> {
    const collage = await this.collageRepository.findOne({ id });

    return collage.remove();
  }
}
