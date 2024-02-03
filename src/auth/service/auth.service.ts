import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }


    //1- login
    async login(email: any, password: any) {
        const validUser: any = await this.validateUser(email, password);
        const payload = { userId: validUser.id, role: validUser.rol, username: validUser.name };
        return {
            uid: validUser.id,
            userName: validUser.name,
            userMail: validUser.email,
            access_token: this.jwtService.sign(payload)

        };
    }

    // Validacion de usuario para el login.
    async validateUser(email: string, password: string): Promise<User> {
        let user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isAuthorized = await bcrypt.compare(password, user.password);
        if (!isAuthorized) {
            throw new UnauthorizedException('User unauthorized');
        }

        return user;
    }

    // 2- registro de usuarios
    async registerUser(userData: CreateUserDto) {
        try {
            const user = await this.usersService.findByEmail(userData.email);
            if (user) {
                return {
                    ok: false,
                    messagge: `Esta correo ya se encuentra registrado a una cuenta.`
                }
            } else {
                const userRegister = await this.usersService.create(userData);
                const payload = {
                    userId: userRegister.id,
                    password: userRegister.password,
                    role: Role.USER
                };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }

        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
