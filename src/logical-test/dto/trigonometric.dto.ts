import { ApiProperty } from '@nestjs/swagger';

export class TrigonometricDto {
  @ApiProperty()
  x: number;

  @ApiProperty()
  y: number;

  @ApiProperty()
  z: number;
}