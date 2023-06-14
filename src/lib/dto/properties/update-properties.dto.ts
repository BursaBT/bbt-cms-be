import { IsNotEmpty, IsString } from 'class-validator';
import {CreatePropertiesDto} from "./create-properties.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePropertiesDto extends  CreatePropertiesDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:'Key',
    example:'smoke'
  })
  key: string;

  @IsNotEmpty()
  @ApiProperty({
    description:'Value',
    example:'false',
  })
  value: string;
}
