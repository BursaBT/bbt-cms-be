import {IsDate, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Uzeyr OZCAN',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'muzeyr@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'P@ssword123456',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    example: 'P@ssword123456',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    description: 'Profile Image URL',
    example: 'profile.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
