import { IsNotEmpty, IsString } from 'class-validator';
import {OrderState} from "../../enum";

export class UpdateOrderDto {

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  id: string;

  orderState?: OrderState;
}
