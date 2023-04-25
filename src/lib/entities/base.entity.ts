import {BeforeInsert, Column, CreateDateColumn, DeepPartial, DeleteDateColumn, Index, UpdateDateColumn} from "typeorm";
import {Exclude, Expose} from "class-transformer";
import {ApiHideProperty} from "@nestjs/swagger";
import {Logger} from "@nestjs/common";
import {ObjectId} from "bson";
export abstract class BaseEntity {

  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(input?: DeepPartial<any>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }

  @Column({
    primary: true,
    type: 'varchar',
    length: 36,
  })
  id!: string;

  @Expose()
  @CreateDateColumn()
  createdAt!: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt!: Date;

  @ApiHideProperty()
  @Exclude()
  @DeleteDateColumn({ nullable: true })
  @Index({ unique: false })
  deletedAt?: Date;

  @Column({ nullable: true })
  @Exclude()
  cometToken?: string;

  @BeforeInsert()
  async beforeInsert() {
    this.id = new ObjectId(ObjectId.generate()).toHexString();
  }

}
