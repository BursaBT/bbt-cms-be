import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../entities";

export class LoginResponse {
  @ApiProperty()
  user!: User;
  @ApiProperty()
  accessToken!: string;

}
