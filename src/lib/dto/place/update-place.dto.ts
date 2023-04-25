import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id: string;
}
