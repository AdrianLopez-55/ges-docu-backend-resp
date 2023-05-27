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
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { Request } from 'express'
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    DocumentsModule,
    RoadMapModule,
    MilestonesModule,
    AdditionalMetadataModule,
    PhysicalLocationModule,
    UsersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
          },
        },
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          }
        }
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
