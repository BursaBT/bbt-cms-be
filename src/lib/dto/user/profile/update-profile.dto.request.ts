import {ApiProperty, OmitType, PartialType} from "@nestjs/swagger";
import {User} from "../../../entities";

export class ProfileUserResponse extends PartialType(
  OmitType(User, ['password']),
) {
  constructor(user?: User) {
    super(user);
  }
}
