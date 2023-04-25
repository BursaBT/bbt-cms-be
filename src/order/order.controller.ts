import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
 import { OrderService } from "./order.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderDto, UpdateOrderDto } from 'src/lib/dto';
@ApiTags('Order Services')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Post()
    create(@Body(ValidationPipe) create: CreateOrderDto) {
        return this.orderService.create(create);
    }
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body(ValidationPipe) update: UpdateOrderDto
    ) {
        return this.orderService.update(id, update);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.orderService.delete(id);
    }

    @Get()
    async all() {
        return this.orderService.all();
    }
}
