import { BaseEntity } from './base.entity';
import {Column, Entity} from "typeorm";

@Entity()
export class Properties extends BaseEntity {

  @Column()
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

}
