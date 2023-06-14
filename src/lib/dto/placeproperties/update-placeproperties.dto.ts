import { IsNotEmpty, IsString } from 'class-validator';
import {CreatePlacePropertiesDto} from "./create-placeproperties.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePlacePropertiesDto extends  CreatePlacePropertiesDto{

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:'Place Id',
    example:'1'
  })
  placeId: string;

  @IsNotEmpty()
  @ApiProperty({
    description:'Price',
    example:{smoke:true,crowded:true,speedInternet:true},
  })
  properties: object;

}
