import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:'Product Name',
    example:' Package Name 1'
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description:'Price',
    example:'10',
  })
  price: number;
}
