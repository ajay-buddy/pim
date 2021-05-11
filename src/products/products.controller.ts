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
import { CreateProductDto, EditProductDto } from './dto/create-product-dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Post('/bulk')
  @UsePipes(ValidationPipe)
  createBulkProduct(
    @Body() createProductDto: CreateProductDto[],
  ): Promise<Product[]> {
    return this.productService.createBulkProduct(createProductDto);
  }

  @Post('/bulk/edit')
  @UsePipes(ValidationPipe)
  editBulkProduct(
    @Body() editProductDto: EditProductDto[],
  ): Promise<Product[]> {
    return this.productService.editBulkProduct(editProductDto);
  }
}
