import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOrderDto {
  @IsNotEmpty()
  id: string;
}
