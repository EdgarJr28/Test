import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class setRatingDto {


    @IsString()
    @ApiProperty()
    readonly score: number;

    @IsEmail()
    @ApiProperty({ type: String, required: true })
    readonly comment: string;

    @IsString()
    @ApiProperty({ type: String, required: true })
    readonly video_id: string;

}
