import { BaseEntity } from './base.entity';
import {Column, Entity} from "typeorm";

@Entity()
export class Product extends BaseEntity {

  @Column()
  name: string;

  @Column()
  price: number;

}
