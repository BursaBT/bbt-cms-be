import { BaseEntity } from './base.entity';
import {Column, Entity} from "typeorm";

@Entity()
export class Menu extends BaseEntity {

  @Column()
  title: string;

  @Column()
  icon: number;

}
