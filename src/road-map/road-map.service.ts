import { Injectable } from '@nestjs/common';
import { CreateRoadMapDto } from './dto/create-road-map.dto';
import { UpdateRoadMapDto } from './dto/update-road-map.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RoadMapDocument, RoadMaps } from './schema/road-map.dchema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class RoadMapService {

  constructor(@InjectModel(RoadMaps.name) private readonly roadMapModel: Model<RoadMapDocument>) {}

  async create(createRoadMapDto: CreateRoadMapDto) {
    return await this.roadMapModel.create(createRoadMapDto);
  }

  async findAll(request: Request): Promise<RoadMaps[]> {
    return this.roadMapModel.find(request.query).setOptions({sanitizeFilter: true}).exec();
  }

  async findOne(idRoadMap: string): Promise<RoadMaps> {
    return this.roadMapModel.findOne({_id: idRoadMap}).exec();
  }

  async update(idRoadMap: string, updateRoadMapDto: UpdateRoadMapDto) {
    return this.roadMapModel.findOneAndUpdate({_id:idRoadMap}, updateRoadMapDto, {
      new: true,
    });
  }

  async remove(idRoadMap: string) {
    return this.roadMapModel.findByIdAndRemove({ _id: idRoadMap}).exec();
  }
}
