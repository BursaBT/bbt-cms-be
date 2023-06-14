import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class DeletePropertiesDto {

  @ApiProperty({
    description:'PropertiesId',
  })
  @IsNotEmpty()
  id: string;
}
