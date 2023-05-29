import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UpdateSignatureAprovedDto {
	@ApiProperty({example: 'juanadolie'})
	@IsString()
	readonly user: string

	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsString()
	readonly dateSignatured: Date
}