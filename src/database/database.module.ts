import { Global, InternalServerErrorException, Module, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';


const logger = new Logger('DatabaseModule');

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'DB',
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
                try {
                    const dbConfig: any = {
                        type: 'mysql',
                        host: configService.get('MYSQL_HOST'),
                        port: parseInt(configService.get('MYSQL_PORT')),
                        username: configService.get('MYSQL_USERNAME'),
                        password: configService.get('MYSQL_ROOT_PASSWORD'),
                        database: configService.get('MYSQL_DATABASE'),
                        synchronize: true,
                        autoLoadEntities: true,
                        ssl: false,
                    };

                    return dbConfig;
                } catch (e) {
                    throw new UnauthorizedException({
                        message: 'Hubo un error de integración de datos',
                    });
                }
            },
            inject: [ConfigService],
        })
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
