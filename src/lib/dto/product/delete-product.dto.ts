import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class DeleteProductDto {

  @ApiProperty({
    description:'ProductId',
  })
  @IsNotEmpty()
  id: string;
}
