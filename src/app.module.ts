import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './ServiceApi/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
