import { Module } from '@nestjs/common';
import { RoadMapService } from './road-map.service';
import { RoadMapController } from './road-map.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoadMapSchema, RoadMaps } from './schema/road-map.dchema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: RoadMaps.name, schema: RoadMapSchema}
  ])],
  controllers: [RoadMapController],
  providers: [RoadMapService],
})
export class RoadMapModule {}
