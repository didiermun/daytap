import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateInvitationDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
