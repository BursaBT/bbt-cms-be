import {BaseEntity} from "./base.entity";
import {Column, Entity, Index, JoinColumn, ManyToOne, ViewColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "./user.entity";
import {Product } from "./product.entity";
import {OrderState, PaymentType} from "../enum";


@Entity()
export class Order extends BaseEntity {

  @ApiProperty()
  @Column()
  orderNumber: string;


  @ViewColumn({ name: 'userId' })
  userId: string;

  @ApiProperty()
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  @Index()
  user?: User;

  @ViewColumn({ name: 'productId' })
  productId: string;

  @ApiProperty()
  @ManyToOne(() => Product,{nullable:false})
  @JoinColumn()
  @Index()
  product?: Product;

  @Column()
  stock: number;

  @Column({
    type:'enum',
    enum: OrderState,
    default: OrderState.CREATED,
    nullable: false
  })
  orderState: OrderState;

  @Column({
    type:'enum',
    enum: PaymentType,
    default: PaymentType.NOTMENTIONED,
    nullable: false
  })
  paymentType: PaymentType;
 

  @Column('decimal',{precision:9,scale:2,nullable:true})
  price: number;




}
