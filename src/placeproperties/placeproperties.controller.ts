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
import { PlacePropertiesService } from './placeproperties.service';
import { CreatePlacePropertiesDto, UpdatePlacePropertiesDto, CreatePropertiesDto, UpdatePropertiesDto } from 'src/lib/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Place Properties Services')
@Controller('product')
export class PlacePropertiesController {
    constructor(private readonly placePropertiesService: PlacePropertiesService) { }

    @Post('placeproperties')
    async create(@Body(ValidationPipe) PlaceProperties: CreatePlacePropertiesDto) {
        return await this.placePropertiesService.create(PlaceProperties);
    }
    @Patch('placeproperties/:id')
    async update(
        @Param('id') id: string,
        @Body(ValidationPipe) PlaceProperties: UpdatePlacePropertiesDto
    ) {
        return await this.placePropertiesService.update(id, PlaceProperties);
    }

    @Delete('placeproperties/:id')
    async delete(@Param('id') id: string) {
        return await this.placePropertiesService.delete(id);
    }

    @Get('placeproperties/:placePropertiesId')
    async getFindById(@Param('placePropertiesId') placePropertiesId: string) {
        return await this.placePropertiesService.getById(placePropertiesId);
    }

    
    @Post('properties')
    async propertiesCreate(@Body(ValidationPipe) CreateProperties: CreatePropertiesDto) {
        return await this.placePropertiesService.createProperties(CreateProperties);
    }
    @Patch('properties/:id')
    async propertiesUpdate(
        @Param('id') id: string,
        @Body(ValidationPipe) Properties: UpdatePropertiesDto
    ) {
        return await this.placePropertiesService.updateProperties(id, Properties);
    }

    @Delete('properties/:id')
    async deleteProperties(@Param('id') id: string) {
        return await this.placePropertiesService.deleteProperties(id);
    }

    @Get('properties/:PropertiesId')
    async getFindByIdProperties(@Param('PropertiesId') PropertiesId: string) {
        return await this.placePropertiesService.getById(PropertiesId);
    }
}
