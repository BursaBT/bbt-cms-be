import { IsNotEmpty, IsString } from 'class-validator';
import {CreatePropertiesDto} from "./create-properties.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePropertiesDto extends  CreatePropertiesDto{

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:'Place Id',
    example:'1'
  })
  placeId: string;

  @IsNotEmpty()
  @ApiProperty({
    description:'propertyId, Property Selection',
    example:{smoke:true,crowded:true,speedInternet:true},
  })
  propertyId: string;

}
