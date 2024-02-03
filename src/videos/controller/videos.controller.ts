import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName } from '../../common/functions/image.decode';
import { VideosService } from '../service/videos.service';
import { SaveVideoDto } from '../dto/saveVideo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';


@ApiTags('Videos')
@Controller('videos')
export class VideosController {

    constructor(private readonly videoService: VideosService) { }


    @Auth(Role.USER)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'subir un nuevo video.' })
    @ApiBearerAuth()
    @Post('/new/video')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                private: { type: 'boolean' },
                title: { type: 'string' },
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName
        })
    }))
    async publishVideos(@UploadedFiles() files: Array<Express.Multer.File>, @Body() payload: SaveVideoDto, @Req() req) {
        try {
            const userId = req['user']?.userId // Acceder al ID del usuario desde el token
            const isPrivate = req.body.private === 'true';
            const newVideo: SaveVideoDto = payload;
            return this.videoService.publishVideo(files, newVideo, userId, isPrivate)
        } catch (e) {
            console.log(e.message);
            throw new HttpException(e.message, 500)
        }
    }

    @Auth(Role.ADMIN)
    @Get('/private/:status')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener videos por estado de privacidad.' })
    @ApiParam({
        name: 'status', required: true, description: 'ingrese el estado de los videos a consultar.', schema: {
            type: 'boolean',
        }
    })
    async getAllVideosByPrivateStatus(@Param('status') payload) {
        const privateStatus = payload === 'true';
        const userVideos = await this.videoService.getVideosByPrivateStatus(privateStatus);
        return userVideos;
    }

    @Get('/my/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener mis videos. (usuario logueado)' })
    async myVideos(@Req() req) {
        const uid = req['user']?.userId // Acceder al ID del usuario desde el token
        const userVideos = await this.videoService.getVideosByUserId(uid);
        return userVideos;
    }

    @Get('/public/')
    @ApiOperation({ summary: 'Obtener videos publicos' })
    async getPublicsVideos() {
        const userVideos = await this.videoService.getPublicsVideos();
        return userVideos;
    }

    @Auth(Role.USER)
    @Get('/privates/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener videos privados (usuario logueados)' })
    async getPrivatesVideos() {
        const userVideos = await this.videoService.getPrivatesVideos();
        return userVideos;
    }

    @Auth(Role.USER)
    @Get('/user/:id')
    @ApiBearerAuth()
    @ApiParam({
        name: 'uid', required: true, description: 'ingrese el id de los videos de usuario a consultar.', schema: {
            type: 'string',
        }
    })
    @ApiOperation({ summary: 'Obtener videos por id de usuario.' })
    async userVideos(@Param('uid') uid: string) {
        const userVideos = await this.videoService.getVideosByUserId(uid);
        return userVideos;
    }

    @Auth(Role.ADMIN)
    @Get('deleted/user/:uid')
    @ApiBearerAuth()
    @ApiParam({
        name: 'uid', required: true, description: 'ingrese el id de los videos eliminados de usuario a consultar.', schema: {
            type: 'string',
        }
    })
    @ApiOperation({ summary: 'Obtener videos eliminados por id de usuario.' })
    async userVideosDeleted(@Param('uid') uid: string) {
        const userVideos = await this.videoService.getVideosDeletedByUserId(uid);
        return userVideos;
    }


    @Auth(Role.USER)
    @Put('/private/status/:id')
    @ApiBearerAuth()
    @ApiParam({
        name: 'id', required: true, description: 'ingrese el id del video a actualizar su estado de privacidad.', schema: {
            type: 'string',
        }
    })
    @ApiOperation({ summary: 'actualizar el estado de privacidad de un video.' })
    async updateStatus(@Param('id') id) {
        const videoUpdated = await this.videoService.updatePrivateStatus(id);
        return videoUpdated;
    }


    @Auth(Role.USER)
    @Delete('/delete/:id')
    @ApiBearerAuth()
    @ApiParam({
        name: 'id', required: true, description: 'ingrese el id del video a eliminar.', schema: {
            type: 'string',
        }
    })
    @ApiOperation({ summary: 'Elimina video por su id.' })
    async deleteVideo(@Param('id') id: string) {
        const videoDeleted = await this.videoService.deleteVideo(id);
        return videoDeleted;
    }


    @Auth(Role.USER)
    @Get('score')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtiene los videos por valoracion de mayor a menor' })
    async getVideosOrderByPuntuacion() {
        const orderScoreVideos = await this.videoService.getVideosOrderByScore()
        return orderScoreVideos
    }
}
