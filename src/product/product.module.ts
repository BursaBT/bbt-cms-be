import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, User } from 'src/lib/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User,Product]),],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
