import { Injectable } from '@nestjs/common';
import { Status } from './product-status.enum';
// import { uuid } from 'uuidv4';
import { CreateProductDto, EditProductDto } from './dto/create-product-dto';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository';
import { CatagoryRepository } from 'src/catagory/catagory.repository';
import { PACKAGING } from './product-package.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(CatagoryRepository)
    private catagoryRepository: CatagoryRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['catagory'],
      take: 10,
    });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      catagoryId,
      name,
      sku,
      price,
      sprice,
      pprice,
      igst,
      cgst,
      quantity,
    } = createProductDto;
    const product = new Product();
    product.name = name;
    product.sku = sku;
    product.price = price;
    product.pprice = pprice;
    product.sprice = sprice;
    product.igst = igst;
    product.cgst = cgst;
    product.package = PACKAGING.KG;
    product.status = Status.ACTIVE;
    product.quantity = quantity;
    const catagory = await this.catagoryRepository.findOne({ id: catagoryId });
    product.catagory = catagory;

    await product.save();
    return product;
  }

  async editProduct(editProductDto: EditProductDto): Promise<Product> {
    const {
      name,
      sku,
      price,
      sprice,
      pprice,
      igst,
      cgst,
      quantity,
      id,
    } = editProductDto;
    console.log('===>', editProductDto);
    const product = await this.productRepository.findOne({ id: id });
    product.name = name;
    product.sku = sku;
    product.price = price;
    product.pprice = pprice;
    product.sprice = sprice;
    product.igst = igst;
    product.cgst = cgst;
    product.package = PACKAGING.KG;
    product.status = Status.ACTIVE;
    product.quantity = quantity;

    await product.save();
    return product;
  }

  async createBulkProduct(
    createProductDto: CreateProductDto[],
  ): Promise<Product[]> {
    const createdProducts = [];
    for (let i = 0; i < createProductDto.length; i++) {
      createdProducts.push(await this.createProduct(createProductDto[i]));
    }
    return createdProducts;
  }

  async editBulkProduct(editProductDto: EditProductDto[]): Promise<Product[]> {
    const createdProducts = [];
    for (let i = 0; i < editProductDto.length; i++) {
      createdProducts.push(await this.editProduct(editProductDto[i]));
    }
    return createdProducts;
  }
}
