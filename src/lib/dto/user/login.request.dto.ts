import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginRequest  {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'muzeyr@example.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'P@ssword123456',
  })
  password: string;
}
