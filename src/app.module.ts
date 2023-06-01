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
//import { TokenValidationMiddleware } from './token-validation.middleware';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';


@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    DocumentsModule,
    UsersModule,
    RoadMapModule,
    MongooseModule.forRoot('mongodb+srv://ct55609:cI5cg4yJgDzvtil1@blog.pkkqspg.mongodb.net/documents-crud'),
    PassportModule,
    AuthModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoginService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
    //consumer.apply(CustomHeaderMiddleware).forRoutes('*');
    //consumer.apply(TokenValidationMiddleware).forRoutes('*')
  }
}
