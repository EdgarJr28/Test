import { Controller, Get } from '@nestjs/common';
import { TopReposService } from '../services/top-repos.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Top Repositorys')
@Controller('top-repos')
export class TopReposController {
    constructor(private readonly topReposService: TopReposService) { }


    @Get('/')
    async getTop() {
        return this.topReposService.getTop();
    }

}
