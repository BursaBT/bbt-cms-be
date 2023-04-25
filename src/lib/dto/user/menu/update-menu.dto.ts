import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateMenuDto {

  @ApiProperty({
    description:'Menu Id',
    example:'1'
  })
  @IsString()
  @IsNotEmpty()
  id: string;

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
