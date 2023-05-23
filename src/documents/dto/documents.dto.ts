import { ApiProperty } from "@nestjs/swagger"

export class createDocumentDTO {
	@ApiProperty()
	readonly title?: string
	@ApiProperty()
	readonly description?: string
}

export class updateDocumentDTO {
	@ApiProperty()
	readonly title?: string
	@ApiProperty()
	readonly description?: string
}