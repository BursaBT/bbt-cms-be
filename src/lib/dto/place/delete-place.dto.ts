import { IsNotEmpty } from 'class-validator';

export class DeletePlaceDto {
  @IsNotEmpty()
  id: string;
}
