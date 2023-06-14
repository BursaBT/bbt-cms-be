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
import { CreatePlacePropertiesDto, UpdatePlacePropertiesDto } from 'src/lib/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Place Properties Services')
@Controller('product')
export class PlacePropertiesController {
    constructor(private readonly placePropertiesService: PlacePropertiesService) { }

    @Post()
    async create(@Body(ValidationPipe) CreatePlaceProperties: CreatePlacePropertiesDto) {
        return await this.placePropertiesService.create(CreatePlaceProperties);
    }
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body(ValidationPipe) CreatePlacePropertiesDto: UpdatePlacePropertiesDto
    ) {
        return await this.placePropertiesService.update(id, CreatePlacePropertiesDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.placePropertiesService.delete(id);
    }

    @Get()
    async getFilter() {
        return await this.placePropertiesService.getFilter('');
    }
    @Get('/:placePropertiesId')
    async getFindById(@Param('placePropertiesId') placePropertiesId: string) {
        return await this.placePropertiesService.getById(placePropertiesId);
    }
}
