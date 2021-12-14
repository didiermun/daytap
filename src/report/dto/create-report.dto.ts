import { ApiProperty } from '@nestjs/swagger';
export class CreateReportDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  location: string;
}