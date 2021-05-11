import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type-orm-config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { PurchaseModule } from './purchase/purchase.module';
import { VendorsModule } from './vendors/vendors.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BullModule } from '@nestjs/bull';
import { CatagoryModule } from './catagory/catagory.module';
import { CustomerModule } from './customer/customer.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { AppModule1 } from './app/app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    ProductsModule,
    AuthModule,
    InventoryModule,
    OrdersModule,
    PurchaseModule,
    VendorsModule,
    TransactionsModule,
    CatagoryModule,
    CustomerModule,
    NotificationModule,
    AppModule1,
  ],
})
export class AppModule {}
