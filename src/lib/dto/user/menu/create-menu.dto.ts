import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateMenuDto {

  @ApiProperty({
    description:'Menu title',
    example:'Dashboard'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description:'Menu icon',
    example:'star'
  })
  @IsString()
  @IsNotEmpty()
  icon: string
}
