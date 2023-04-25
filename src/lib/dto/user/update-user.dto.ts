import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {Expose} from "class-transformer";
import {User} from "../../entities";

export class UpdatePasswordRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  newpassword: string;

  @Expose()
  user: User;
}
