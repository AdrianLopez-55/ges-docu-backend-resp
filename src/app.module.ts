import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './ServiceApi/api.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { RoadMapModule } from './road-map/road-map.module';
import { MilestonesModule } from './milestones/milestones.module';
import { AdditionalMetadataModule } from './additional-metadata/additional-metadata.module';
import { PhysicalLocationModule } from './physical-location/physical-location.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.midleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    DocumentsModule,
    RoadMapModule,
    MilestonesModule,
    AdditionalMetadataModule,
    PhysicalLocationModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes('/*')
  }
}
