import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordService } from './service/keyword.service';
import { KeywordController } from './controller/keyword.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, KeywordController],
  providers: [AppService, KeywordService],
})
export class AppModule {}
