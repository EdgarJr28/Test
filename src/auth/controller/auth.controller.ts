import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
   


    
    // 1- registro usuario
    @ApiOperation({ summary: 'Registro de usuarios.' })
    @ApiBody({ type: CreateUserDto })
    @Post('/register')
    @UseGuards()
    async register(@Body() payload: CreateUserDto) {
        return this.authService.registerUser(payload);
    }

    // 2- login usuarios
    @Post('/login')
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'Inicio de sesion.' })
    login(@Body() payload: { password: string, email: string }) {
        return this.authService.login(payload.email, payload.password);
    }
    
}
