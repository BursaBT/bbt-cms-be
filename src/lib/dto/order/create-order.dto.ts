import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'UserID'
  })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({
    example:'ProductID'
  })
  productId: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 1
  })
  stock: number;

}
