import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class Odddto {
  @IsNumber()
  @ApiProperty()
  readonly number: number;
}
