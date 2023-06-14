import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreatePropertiesDto {
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
    example:'true||false',
  })
  value: string;
}
