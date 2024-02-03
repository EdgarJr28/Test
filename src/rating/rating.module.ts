import { Module } from '@nestjs/common';
import { RatingController } from './controller/rating.controller';
import { RatingService } from './services/rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating], 'DB')
  ],
  controllers: [RatingController],
  providers: [JwtService, RatingService]
})
export class RatingModule { }
