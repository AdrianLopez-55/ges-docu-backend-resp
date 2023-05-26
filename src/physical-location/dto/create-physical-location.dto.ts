import { ApiProperty } from "@nestjs/swagger";

export class CreatePhysicalLocationDto {
	@ApiProperty()
	physicalPlace: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	notes: string;
}
