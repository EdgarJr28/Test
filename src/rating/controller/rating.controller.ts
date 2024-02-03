import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RatingService } from '../services/rating.service';
import { Rating } from '../entities/rating.entity';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Role } from '../../common/enums/roles.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { setRatingDto } from '../dto/setRating.dto';


@ApiTags('Rating')
@Controller('rating')
export class RatingController {

    constructor(private readonly ratingService: RatingService) { }
    

    @Auth(Role.USER)
    @Post('new/score')
    @ApiBearerAuth()
    @ApiBody({ type: setRatingDto })
    @ApiOperation({ summary: 'guardar valoracion de un video.' })
    async setScoreRatingVideo(@Req() req, @Body() rating: Rating) {
        const userId = req['user']?.userId // Acceder al ID del usuario desde el token
        const newScore = await this.ratingService.newScoreRating(rating, userId)
        return newScore
    }


    @Post('new/comment')
    @ApiBody({ type: setRatingDto })
    @ApiOperation({ summary: 'guardar comentario de valoracion de un video.' })
    async setCommentRatingVideo(@Body() rating: Rating) {

        const newScore = await this.ratingService.newCommentRating(rating)
        return newScore
    }

    @Auth(Role.ADMIN)
    @Get('rating/best')
    @ApiBearerAuth()
    @ApiParam({
        name: 'id', required: true, description: 'ingrese el id del video a consultar su rating.', schema: {
            type: 'string',
        }
    })
    @ApiOperation({ summary: 'Obtiene las valoraciones de mejor a peor de un video.' })
    async getRatingVideoById(@Param('id') id) {

        const getScore = await this.ratingService.getRatingVideoById(id)
        return getScore
    }
}
