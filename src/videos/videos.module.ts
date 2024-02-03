import { Module } from '@nestjs/common';
import { VideosService } from './service/videos.service';
import { VideosController } from './controller/videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Videos } from './entities/videos.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Videos], 'DB'),
    MulterModule.register({
      dest: './uploads', // Carpeta de destino donde se guardarán los videos.
      limits: { fieldSize: 25 * 1024 * 1024 } //limite del tamaño del fichero.
    }),
  ],
  controllers: [VideosController],
  providers: [JwtService, VideosService]
})
export class VideosModule { }
