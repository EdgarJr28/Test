import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { User } from '../entities/user.entity'

@CustomRepository(User)
export class UserEntRepository extends Repository<User> {

}