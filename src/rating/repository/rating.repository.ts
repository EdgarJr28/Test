import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { Rating } from "../entities/rating.entity";


@CustomRepository(Rating)
export class RatingRepository extends Repository<Rating> {

}