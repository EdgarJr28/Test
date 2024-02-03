import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SaveVideoDto {


    @IsString()
    @ApiProperty()
    readonly title: string;

    @IsEmail()
    @ApiProperty({ type: String, required: true })
    readonly url: string;

    @IsString()
    @ApiProperty({ type: String, required: true })
    readonly user_id: string;

    @IsString()
    @ApiProperty({ type: String, required: true })
    readonly private: string;

}
