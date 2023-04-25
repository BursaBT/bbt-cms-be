import {ApiProperty} from "@nestjs/swagger";
import {ProfileUserResponse} from "./update-profile.dto.request";

export class ProfileResponse {
  @ApiProperty()
  user: ProfileUserResponse;
}
