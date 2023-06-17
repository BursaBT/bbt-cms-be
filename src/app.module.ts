import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './lib/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ProductModule,
    OrderModule,
    MenuModule,
    PlaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
