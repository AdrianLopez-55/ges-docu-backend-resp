import { CreateRoadMapDto } from "./dto/create-road-map.dto"
import { RoadMap } from "./entities/road-map.entity"

export const ROADMAP_REPOSITORY = 'RoadMapRepository'

export interface RoadMapRepository {
	create(roadMap: CreateRoadMapDto): Promise<RoadMap>;
}