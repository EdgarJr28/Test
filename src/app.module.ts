import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopReposController } from './top-repos/controllers/top-repos.controller';
import { TopReposService } from './top-repos/services/top-repos.service';
import { LogicalTestController } from './logical-test/controllers/logical-test.controller';
import { LogicalTestService } from './logical-test/services/logical-test.service';


@Module({
  imports: [],
  controllers: [AppController, TopReposController, LogicalTestController],
  providers: [AppService, TopReposService, LogicalTestService],
})
export class AppModule {}
