import { IsNotEmpty } from 'class-validator';
import {CreateProductDto} from "./create-product.dto";

export class UpdateProductDto extends  CreateProductDto{

  @IsNotEmpty()
  id: string;
}
