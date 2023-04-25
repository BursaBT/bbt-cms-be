import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Test Cafe',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '',
  })
  type: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '40.21218394015038'
  })
  latitude: string;

  @IsNotEmpty()
  @ApiProperty({
    example: ' 28.934415426456617'
  })
  longitude: string;

  @IsString()
  @ApiProperty({
    example: 'test desc'
  })
  description: string;

  userId: string;

}
