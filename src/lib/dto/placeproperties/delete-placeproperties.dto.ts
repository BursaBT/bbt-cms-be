import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class DeletePlacePropertiesDto {

  @ApiProperty({
    description:'PlaceId',
  })
  @IsNotEmpty()
  id: string;
}
