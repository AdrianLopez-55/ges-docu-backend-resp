import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class CreatePhysicalLocationDto {
	@ApiProperty({example: 'departamento 6C'})
	@IsString()
	readonly place: string
	
	@ApiProperty({example: 'piso 5'})
	@IsString()
	readonly floor: String
	
	@ApiProperty({example: 'oficina 35'})
	@IsString()
	readonly office: string
	
	@ApiProperty({example: 'Estante 8A'})
	@IsString()
	readonly saveIn: String
	
	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsString()
	readonly saveDate: Date
}