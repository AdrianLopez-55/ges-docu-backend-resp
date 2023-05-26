import { PartialType } from '@nestjs/swagger';
import { CreateRoadMapDto } from './create-road-map.dto';

export class UpdateRoadMapDto extends PartialType(CreateRoadMapDto) {
	name: string
	description: string
	dateInit: string
	dateEnd: string
}
