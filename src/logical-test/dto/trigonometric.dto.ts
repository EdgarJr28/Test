import { ApiProperty } from '@nestjs/swagger';

export class TrigonometricDto {
  @ApiProperty()
  readonly x: number;

  @ApiProperty()
  readonly y: number;

  @ApiProperty()
  readonly z: number;
}