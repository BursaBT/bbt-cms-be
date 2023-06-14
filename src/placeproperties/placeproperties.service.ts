import { Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined } from 'class-validator';
import { CreatePlacePropertiesDto, UpdatePlacePropertiesDto } from 'src/lib/dto';
import { PlaceProperties } from 'src/lib/entities';
import { ProductNotFoundException } from 'src/lib/exception/productNotFoundException';
import { Repository } from 'typeorm';

@Injectable()
export class PlacePropertiesService {
    private readonly logger: Logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(PlaceProperties)
        private readonly placePropertiesRepository: Repository<PlaceProperties>
    ) { }

    async create(data: CreatePlacePropertiesDto) {
        try {
            const placeproperties = new PlaceProperties();
            placeproperties.placeId = data.placeId;
            placeproperties.properties = data.properties;
            return await this.placePropertiesRepository.save(placeproperties);
        } catch (e) {
            return e;
        }
    }
    async update(id:string, data: UpdatePlacePropertiesDto) {
        const placeproperties = await this.placePropertiesRepository.findOne({ where: { id } });
        if (isDefined(placeproperties)){
            placeproperties.placeId = data.placeId;
            placeproperties.properties = data.properties;
            return await this.placePropertiesRepository.save(placeproperties);
        }
        throw new ProductNotFoundException(data.placeId);
        
    }
    async delete(id: string) {
        return await this.placePropertiesRepository.softDelete(id);
    }
    async getById(id: string) {
        return await this.placePropertiesRepository.findOne({
            where: {
                id
            }
        });
    }
    async getFilter(filter: string) {
        return await this.placePropertiesRepository.find();
    } 

}
