import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoadMapDto } from './create-road-map.dto';

export class UpdateRoadMapDto extends PartialType(CreateRoadMapDto) {
	@ApiProperty()
	name: string
	@ApiProperty()
	description: string
	@ApiProperty()
	dateInit: string
	@ApiProperty()
	dateEnd: string
}
