import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { UserEntRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User, 'DB') private userRepo: UserEntRepository
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = <User>{
                id: uuidv4(),
                email: createUserDto.email.toLowerCase(),
                password: await bcrypt.hash(createUserDto.password, 10),
                name: `${createUserDto.name.toLowerCase()}`,
                create: new Date(),
                update: new Date(),
            };

            const newUser = await this.userRepo.save(user);
            return newUser;

        } catch (e) {
            throw new HttpException(e, 500)
        }
    }

    findByEmail(email: string) {
        return this.userRepo.findOne({ where: { email: email } });
    }

    async findOneUser(id: string) {
        try {
            const primaryData = await this.userRepo.findOneBy({ id: id })
            if (!primaryData) return { message: `User with id : ${id} not found.` };


            let meData = {
                id: primaryData.id || "",
                rol: primaryData.rol || "",
                status: primaryData.status || "",
                create: primaryData.create,
                update: primaryData.update,
            }

            return meData;

        } catch (e: any) {
            throw new HttpException(e.message, 500)
        }

    }



    updateUserData(user: User) {
        const newUser = this.userRepo.create(user);
        return this.userRepo.save(newUser);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }


    async getAllUsers() {
        var listClients = await this.userRepo.findBy({})

        var listNames = listClients.map(v => {
            return {
                id: v.id,
                name: v.name,
                email: v.email,
            };
        })

        return listNames;
    }


    async setStatus(id: string) {
        try {
            const st: any = await this.userRepo.findOne({ where: { id: id }, select: ["status"] })
            await this.userRepo.update({ id: id }, { status: !st.status });
            return { message: `User with id ${id} is ${!st.private}` }
        } catch (e: any) {
            await this.userRepo.query('ROLLBACK'); // Rollback manual si hay error
            throw new HttpException(e.message, 500);
        }
    }

}





