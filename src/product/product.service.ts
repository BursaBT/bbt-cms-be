import { Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from 'src/lib/dto';
import { Product } from 'src/lib/entities';
import { ProductNotFoundException } from 'src/lib/exception/productNotFoundException';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    private readonly logger: Logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async create(data: CreateProductDto) {
        try {
            const product = new Product();
            product.name = data.name;
            product.price = data.price;
            return await this.productRepository.save(product);
        } catch (e) {
            return e;
        }
    }
    async update(id:string, data: UpdateProductDto) {
        const findProduct = await this.productRepository.findOne({ where: { id } });
        if (isDefined(findProduct)){
            findProduct.name = data.name;
            findProduct.price = data.price;
            return await this.productRepository.save(findProduct);
        }
        throw new ProductNotFoundException(data.name);
        
    }
    async delete(id: string) {
        return await this.productRepository.softDelete(id);
    }
    async getById(id: string) {
        return await this.productRepository.findOne({
            where: {
                id
            }
        });
    }
    async getFilter(filter: string) {
        return await this.productRepository.find();
    } 

}
