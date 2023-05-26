import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator";

export class CreateMilestoneDto {
	@ApiProperty()
	@IsString()
	name: string
	@ApiProperty()
	description: string
	@ApiProperty()
	dateInit: string
	@ApiProperty()
	dateEnd: string
}
