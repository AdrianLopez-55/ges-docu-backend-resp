import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './ServiceApi/api.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { RoadMapModule } from './road-map/road-map.module';
import { MilestonesModule } from './milestones/milestones.module';
import { AdditionalMetadataModule } from './additional-metadata/additional-metadata.module';
import { PhysicalLocationModule } from './physical-location/physical-location.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    DocumentsModule,
    RoadMapModule,
    MilestonesModule,
    AdditionalMetadataModule,
    PhysicalLocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
