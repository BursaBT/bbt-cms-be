import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateOrderDto, UpdateOrderDto } from 'src/lib/dto';
import { Order, Product, User } from 'src/lib/entities';
import { OrderNotFoundException } from 'src/lib/exception';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>) {
    }
    async create(data: CreateOrderDto) {
        const order = await this.orderRepository.create();
        order.user = new User({ id: data.userId });
        order.product = new Product({ id: data.productId });
        order.stock = data.stock;
        order.orderNumber = randomUUID();
        try {
            const result = await this.orderRepository.save(order);
            return result;
        } catch (e) {
            Logger.error(e);
        }

    }
    async update(data: UpdateOrderDto) {
        const order = await this.orderRepository.findOne({
            where: {
                id: data.id,
            }
        })
        if (order) {
            //order.userId =  data.userId;
            //order.productId = data.productId;
            order.stock = data.stock;
            if (data.orderState) {
                order.orderState = data.orderState;
            }
            return await this.orderRepository.save(order);
        } else {
            throw new OrderNotFoundException(order.orderNumber);
        }

    }
    async detail(orderNumber: string) {
        const result = await this.orderRepository.findOne({
            where: {
                orderNumber
            }
        });
        return result;
    }
}
