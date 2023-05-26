import { Injectable } from '@nestjs/common';
import { CreateRoadMapDto } from './dto/create-road-map.dto';
import { UpdateRoadMapDto } from './dto/update-road-map.dto';
import { RoadMap } from './entities/road-map.entity';

@Injectable()
export class RoadMapService {
  private roadMap: RoadMap[] = [];

  create(createRoadMapDto: CreateRoadMapDto): RoadMap {
    const roadMap: RoadMap = {
      idRoadMap: 'werer',
      name: createRoadMapDto.name,
      description: createRoadMapDto.description,
      dateInit: createRoadMapDto.dateInit,
      dateEnd: createRoadMapDto.dateEnd,
    }
    this.roadMap.push(roadMap);
    return roadMap ;
  }

  findAll() {
    return this.roadMap;
  }

  findOne(idRoadMap: string) {
    return this.roadMap.find(roadMap => roadMap.idRoadMap === idRoadMap);
  }

  update(idRoadMap: string, updateRoadMapDto: UpdateRoadMapDto) {
    const roadMap = this.findOne(idRoadMap)
    const newRoadMap = Object.assign(roadMap, updateRoadMapDto)
    this.roadMap.map(roadMap => roadMap.idRoadMap === idRoadMap ? newRoadMap : roadMap)
    return newRoadMap;
  }

  remove(idRoadMap: string) {
    return this.roadMap = this.roadMap.filter(roadMap => roadMap.idRoadMap !== idRoadMap);
  }
}
