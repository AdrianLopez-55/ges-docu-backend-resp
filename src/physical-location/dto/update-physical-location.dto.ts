import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhysicalLocationDto } from './create-physical-location.dto';

export class UpdatePhysicalLocationDto extends PartialType(CreatePhysicalLocationDto) {
	@ApiProperty()
	physicalPlace: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	notes: string;
}
