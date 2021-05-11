import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorsRepository } from './vendors.repository';
import { Vendors } from './vendors.entity';
import { CreateVendorDto } from './dto/create-vendor-dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(VendorsRepository)
    private vendorRepository: VendorsRepository,
  ) {}

  async getAllVendors(): Promise<Vendors[]> {
    return await this.vendorRepository.find();
  }

  async createVendor(createVendorDto: CreateVendorDto): Promise<Vendors> {
    const { name } = createVendorDto;
    const vendor = new Vendors();
    vendor.name = name;

    await vendor.save();
    return vendor;
  }
}
