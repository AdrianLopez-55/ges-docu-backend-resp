import { InjectModel } from "@nestjs/mongoose";
import { RoadMapRepository } from "./road-map.repository";
import { RoadMap } from "./entities/road-map.entity";
import { RoadMapModel } from "./schema/road-map.dchema";
import { CreateRoadMapDto } from "./dto/create-road-map.dto";

export class MongoRoadMaprepository implements RoadMapRepository {
	constructor (@InjectModel(RoadMap.name) private readonly roadMapModel : RoadMapModel){}

	async create(createRoadMapDTO: CreateRoadMapDto): Promise<RoadMap> {
		const roadMap = await new this.roadMapModel(createRoadMapDTO).save();
		return new RoadMap();
	}
}