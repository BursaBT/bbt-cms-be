import { Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined } from 'class-validator';
import { CreatePlacePropertiesDto, UpdatePlacePropertiesDto, CreatePropertiesDto, UpdatePropertiesDto } from 'src/lib/dto';
import { PlaceProperties, Properties } from 'src/lib/entities';
import { PropertiesNotFoundException } from 'src/lib/exception/propertiesNotFoundException';
import { Repository } from 'typeorm';

@Injectable()
export class PlacePropertiesService {
    private readonly logger: Logger = new Logger(this.constructor.name);
    constructor(
        @InjectRepository(PlaceProperties)
        private readonly placePropertiesRepository: Repository<PlaceProperties>,
        @InjectRepository(Properties)
        private readonly propertiesRepository: Repository<Properties>,
    ) { }
    async create(data: CreatePlacePropertiesDto) {
        try {
            const placeproperties = new PlaceProperties();
            placeproperties.placeId = data.placeId;
            placeproperties.propertyId = data.propertyId;
            return await this.placePropertiesRepository.save(placeproperties);
        } catch (e) {
            return e;
        }
    }
    async update(id:string, data: UpdatePlacePropertiesDto) {
        const placeproperties = await this.placePropertiesRepository.findOne({ where: { id } });
        if (isDefined(placeproperties)){
            placeproperties.placeId = data.placeId;
            placeproperties.propertyId = data.propertyId;
            return await this.placePropertiesRepository.save(placeproperties);
        }
        throw new PropertiesNotFoundException(data.placeId);
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
    async createProperties(properties: CreatePropertiesDto) {
        try {
            const newProperties = new Properties();
            newProperties.key = properties.key;
            newProperties.value = properties.value;
            return await this.propertiesRepository.save(newProperties);
        } catch (e) {
            return e;
        }
    }
    async updateProperties(id:string, data: UpdatePropertiesDto) {
        const properties = await this.propertiesRepository.findOne({ where: { id } });
        if (isDefined(properties)){
            properties.key = data.key;
            properties.value = data.value;
            return await this.propertiesRepository.save(properties);
        }
        throw new PropertiesNotFoundException(data.key);
    }

    async deleteProperties(id: string) {
        return await this.propertiesRepository.softDelete(id);
    }

    
    async getByIdProperties(id: string) {
        return await this.placePropertiesRepository.findOne({
            where: {
                id
            }
        });
    }
    

}
