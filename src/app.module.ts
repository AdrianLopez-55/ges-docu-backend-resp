import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './ServiceApi/api.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { RoadMapModule } from './road-map/road-map.module';
import { UsersModule } from './users/users.module';
import { CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { CustomHeaderMiddleware } from './custom-header.middleware';


@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    DocumentsModule,
    UsersModule,
    RoadMapModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    PassportModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
    consumer.apply(CustomHeaderMiddleware).forRoutes('*');
  }
}
