import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVendorDto } from './dto/create-vendor-dto';
import { Vendors } from './vendors.entity';
import { VendorsService } from './vendors.service';

@Controller('vendors')
@UseGuards(AuthGuard('jwt'))
export class VendorsController {
  constructor(private vendorService: VendorsService) {}

  @Get()
  getAllProducts(): Promise<Vendors[]> {
    return this.vendorService.getAllVendors();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createVendorDto: CreateVendorDto): Promise<Vendors> {
    return this.vendorService.createVendor(createVendorDto);
  }
}
