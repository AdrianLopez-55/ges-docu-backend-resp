import { ApiProperty } from "@nestjs/swagger"

export class CreateMilestoneDto {
	@ApiProperty()
	name: string
	@ApiProperty()
	description: string
	@ApiProperty()
	dateInit: string
	@ApiProperty()
	dateEnd: string
}
