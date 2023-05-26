import { ApiProperty } from "@nestjs/swagger"

export class CreateAdditionalMetadatumDto {
	@ApiProperty()
	keywords: string[]
	@ApiProperty()
	tags: string[]
	@ApiProperty()
	dateInit: string
	@ApiProperty()
	dateEnd: string
	@ApiProperty()
	responsible: string
	@ApiProperty()
	departament: string
}
