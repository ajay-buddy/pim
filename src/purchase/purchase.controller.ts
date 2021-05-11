import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePurchaseDto } from './dto/create-purchase-dto';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
@UseGuards(AuthGuard('jwt'))
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}
  @Post()
  createPurchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Get()
  getAllPurchase(): Promise<Purchase[]> {
    return this.purchaseService.getAllPurchase();
  }
  @Get('/vendor/:id')
  getAllPurchaseByVendorId(@Param('id') id): Promise<Purchase[]> {
    return this.purchaseService.getAllPurchaseByVendorId(id);
  }
  @Get('/:id')
  getAllPurchaseByPurchaseId(@Param('id') id): Promise<Purchase[]> {
    return this.purchaseService.getAllPurchaseByPurchaseId(id);
  }
}
