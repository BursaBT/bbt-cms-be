import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, Product, User } from 'src/lib/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Order]),],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
