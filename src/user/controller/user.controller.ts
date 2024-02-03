import {
    Put,
    Controller,
    Get,
    Post,
    Body,
    Req,
    Param,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Role } from '../../common/enums/roles.enum';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Auth(Role.USER)
@ApiTags('Users')
@Controller('User')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Ruta protegida con Bearer Token' })
    @ApiBearerAuth()
    @Get('test')
    test(@Req() req) {
        const userId = req['user']?.userId; // Acceder al ID del usuario desde el token
        return { message: "Controller OK", uid: userId }
    }

    @ApiOperation({ summary: 'Obtener todos los usuarios activos de la aplicacion.' })
    @ApiBearerAuth()
    @Get('all')
    @Auth(Role.ADMIN)
    async getAllUsers() {
        return this.userService.getAllUsers();
    }


    @ApiOperation({ summary: 'Obtener usuario por id.' })
    @ApiParam({name: 'id', required: true, description: 'ingrese la id de usuario.', schema: { oneOf: [{type: 'string'} ]}})
    @ApiBearerAuth()
    @Post('/:id')
    async getUserbyId(@Param('id') id) {
        return this.userService.findOneUser(id);
    }
    

    @ApiOperation({ summary: '[habilitar/inhabilitar] usuario por id.' })
    @ApiParam({name: 'id', required: true, description: 'ingrese la id de usuario para [habilitar/inhabilitar].', schema: { oneOf: [{type: 'string'} ]}})
    @ApiBearerAuth()
    @Post('status/:id')
    async updateStatus(@Param('id') id) {
        return this.userService.setStatus(id);
    }
}