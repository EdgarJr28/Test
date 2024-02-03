import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { RatingRepository } from '../repository/rating.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RatingService {

    constructor
        (
            @InjectRepository(Rating, 'DB') private ratingRepo: RatingRepository
        ) { }


    async newScoreRating(rating: Rating, uid: string) {
        try {
            let ratingUID = uuidv4();
            const saveVideo = <unknown>{
                id: ratingUID,
                score: rating.score,
                comment: rating.comment || "",
                video_id: rating.video_id,
                user_id: uid
            };
            const newRating = await this.ratingRepo.save(saveVideo);

            return { newRating };
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }

    async newCommentRating(rating: Rating) {
        try {
            let ratingUID = uuidv4();
            const saveComment = <unknown>{
                id: ratingUID,
                score: rating.score,
                comment: rating.comment || "",
                video_id: rating.video_id
            };
            const newRating = await this.ratingRepo.save(saveComment);

            return { newRating };
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }



    async getRatingVideoById(id: string) {
        try {
            const bestScoreResult = await this.ratingRepo.find({
                select: ['score', 'comment'],
                where: {
                    video_id: id,
                },
                order: {
                    score: 'DESC', // Ordenar de forma descendente para obtener el puntaje máximo primero
                },
            });

            return { bestScoreResult };
        } catch (e: any) {
            throw new HttpException(e.message, 500);
        }
    }
}
