import { Module } from '@nestjs/common';
import { PlacePropertiesController } from './placeproperties.controller';
import { PlacePropertiesService } from './placeproperties.service';
import { PlaceProperties, Properties } from 'src/lib/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Properties,PlaceProperties]),],
  controllers: [PlacePropertiesController],
  providers: [PlacePropertiesService]
})
export class PlacePropertiesModule {}
