import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catagory } from './catagory.entity';
import { CatagoryRepository } from './catagory.repository';
import { CreateCatagoryDto } from './dto/create-catagory-dto';
import { Product } from '../products/products.entity';

@Injectable()
export class CatagoryService {
  constructor(
    @InjectRepository(CatagoryRepository)
    private catagoryRepository: CatagoryRepository,
  ) {}

  async getAllCategory(): Promise<Catagory[]> {
    return this.catagoryRepository.find();
  }

  async createCatagory(
    createCatagoryDto: CreateCatagoryDto,
  ): Promise<Catagory> {
    const { name } = createCatagoryDto;

    const catagory = new Catagory();

    catagory.name = name;

    return catagory.save();
  }
}
