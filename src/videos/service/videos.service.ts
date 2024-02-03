import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Videos } from '../entities/videos.entity';
import { VideosRepository } from '../repository/videos.repository';
import { SaveVideoDto } from '../dto/saveVideo.dto';
import { createUrlDocuments } from '../../common/functions/videos.sort';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideosService {
    constructor
        (
            @InjectRepository(Videos, 'DB') private videoRepo: VideosRepository
        ) { }



    async publishVideo(files: any, video: SaveVideoDto, uid: string, isPrivate: boolean) {
        try {
            let videoUID = uuidv4();
            const testFiles: any = await createUrlDocuments(files)
            const saveVideo = <unknown>{
                id: videoUID,
                title: video.title,
                url: testFiles?.pic1,
                user_id: uid,
                private: isPrivate,
                create: new Date(),
                update: new Date()
            };
            const newVideo = await this.videoRepo.save(saveVideo);

            return { newVideo };
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }


    async getVideosByPrivateStatus(status: boolean) {
        try {
            // hacemos la consulta para obtener los videos del usuario que no haya eliminado
            const videos: any = await this.videoRepo.find({ where: { private: status } })
            return { ok: true, videos }
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }

    async getPublicsVideos() {
        try {
            // hacemos la consulta para obtener los videos del usuario que no haya eliminado
            const videos: any = await this.videoRepo.find({ where: { private: false } })
            return { ok: true, videos }
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }

    async getPrivatesVideos() {
        try {
            // hacemos la consulta para obtener los videos del usuario que no haya eliminado
            const videos: any = await this.videoRepo.find({ where: { private: false } })
            return { ok: true, videos }
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }

    async getVideosByUserId(uid: string) {
        try {
            // hacemos la consulta para obtener los videos del usuario que no haya eliminado
            const videos: any = await this.videoRepo.find({ where: { user_id: uid, status: true } })
            return { ok: true, videos }
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }

    async getVideosDeletedByUserId(uid: string) {
        try {
            // hacemos la consulta para obtener los videos del usuario que haya eliminado
            const videos: any = await this.videoRepo.find({ where: { user_id: uid, status: false } })
            return { ok: true, videos }
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }

    async updatePrivateStatus(videoId: string) {
        try {
            const st: any = await this.videoRepo.findOne({ where: { id: videoId }, select: ["private"] })
            await this.videoRepo.update({ id: videoId }, { private: !st.private });
            return { message: `video with id ${videoId} is ${!st.private}` }
        } catch (e: any) {
            await this.videoRepo.query('ROLLBACK'); // Rollback manual si hay error
            throw new HttpException(e.message, 500);
        }
    }

    async deleteVideo(videoId: string) {
        try {
            await this.videoRepo.update({ id: videoId }, { status: false });
            return { message: `video with id ${videoId} is deleted.` }
        } catch (e: any) {
            await this.videoRepo.query('ROLLBACK'); // Rollback manual si hay error
            throw new HttpException(e.message, 500);
        }
    }

    async getVideosOrderByScore(): Promise<Videos[]> {
        return this.videoRepo
            .createQueryBuilder('V')
            .innerJoinAndSelect('V.rating', 'R')
            .orderBy('R.score', 'DESC')
            .getMany();
    }
}
