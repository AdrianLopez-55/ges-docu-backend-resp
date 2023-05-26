import { ApiProperty } from "@nestjs/swagger"

export class CreateRoadMapDto {
	@ApiProperty()
	name: string
	@ApiProperty()
	description: string
	@ApiProperty()
	dateInit: string
	@ApiProperty()
	dateEnd: string
}
