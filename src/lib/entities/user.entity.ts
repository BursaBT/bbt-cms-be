import {BaseEntity} from "./base.entity";
import {BeforeUpdate, Column, Entity} from "typeorm";
import {ApiHideProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";
import { getRounds, hash } from 'bcrypt';
@Entity()
export class User extends BaseEntity {

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  @ApiHideProperty()
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  provider: string;

  @Column()
  image: string;

  @BeforeUpdate()
  async hashPasswordField() {
    try {
      console.log('hashPasswordField11')
      if (this.password && getRounds(this.password) != 10) {
        console.log('hashPasswordField22')
        this.password = await hash(this.password, 10);
      }
      console.log('hashPasswordField332')

    } catch {
      console.log('hashPasswordField5555')
      this.password = await hash(this.password, 10);
    }
  }
}
