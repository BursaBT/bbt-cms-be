import { Module } from '@nestjs/common';
import { PlacePropertiesController } from './placeproperties.controller';
import { PlacePropertiesService } from './placeproperties.service';
import { PlaceProperties, User } from 'src/lib/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User,PlaceProperties]),],
  controllers: [PlacePropertiesController],
  providers: [PlacePropertiesService]
})
export class PlacePropertiesModule {}
