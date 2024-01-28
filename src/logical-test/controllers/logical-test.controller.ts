import { Body, Controller, Post } from '@nestjs/common';
import { LogicalTestService } from '../services/logical-test.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Odddto } from '../dto/odd.dto';
import { TrigonometricDto } from '../dto/trigonometric.dto';

@ApiTags('Logical')
@Controller('logical-test')
export class LogicalTestController {
    constructor(private readonly logicalService: LogicalTestService) { }



    @Post('/odd')
    @ApiBody({ type: Odddto })
    async getOdd(@Body() body: Odddto) {
        let number: number = body.number
        return this.logicalService.oddUntilN(number);
    }

    @Post('/trigonometric')
    @ApiBody({ type: TrigonometricDto })
    async getTrigonometric(@Body() body: TrigonometricDto) {
        let { x, y, z } = body
        return this.logicalService.trigonometricFunction(x, y, z);
    }
}
