import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { Videos } from "../entities/videos.entity";


@CustomRepository(Videos)
export class VideosRepository extends Repository<Videos> {

}