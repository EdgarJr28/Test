import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopReposController } from './top-repos/controllers/top-repos.controller';
import { TopReposService } from './top-repos/services/top-repos.service';
import { LogicalTestController } from './logical-test/controllers/logical-test.controller';
import { LogicalTestService } from './logical-test/services/logical-test.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environment } from './enviroment';
import { VideosModule } from './videos/videos.module';
import { RatingModule } from './rating/rating.module';
import config from './config';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    VideosModule,
    RatingModule
  ],
  controllers: [ /* TopReposController, LogicalTestController */],
  providers: [/* TopReposService, LogicalTestService */],
})
export class AppModule {}
