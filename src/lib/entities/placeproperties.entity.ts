import { BaseEntity } from './base.entity';
import {Column, Entity} from "typeorm";

@Entity()
export class PlaceProperties extends BaseEntity {

  @Column()
  placeId: string;

  @Column()
  propertyId: string;

}
