import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from 'src/lib/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Services')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto);
    }
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body(ValidationPipe) createProductDto: UpdateProductDto
    ) {
        return await this.productService.update(id, createProductDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.productService.delete(id);
    }

    @Get()
    async getFilter() {
        return await this.productService.getFilter('');
    }
    @Get('/:productId')
    async getFindById(@Param('productId') productId: string) {
        return await this.productService.getById(productId);
    }
}
