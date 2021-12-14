import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  lname: string;

  @IsNotEmpty()
  @ApiProperty()
  fname: string;

  @ApiProperty()
  profile: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  level: string;
}
