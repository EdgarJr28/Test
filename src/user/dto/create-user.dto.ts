import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsEmail()
    @ApiProperty({ type: String, format: 'email', required: true })
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @ApiProperty()
    readonly birthday: string;
}
