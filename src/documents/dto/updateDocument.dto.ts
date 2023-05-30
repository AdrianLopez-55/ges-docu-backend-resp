import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, isArray } from "class-validator";

export class UpdateDocumentDTO {
	@ApiProperty({example: 'DOC-001'})
	@IsString()
	readonly numberDocument: string

	@ApiProperty({example: 'Resources from DataCenter'})
	@IsString()
	readonly title: string;

	@ApiProperty({example: 'J. Adrian Chase'})
	@IsString()
	readonly authorDocument: string;

	@ApiProperty({example: '/archivos/documento001.pdf'})
	@IsString()
	readonly digitalUbication: string;

	@ApiProperty({example: 'Resource'})
	@IsString()
	readonly documentType: string;

	@ApiProperty({example: 'aprobado'})
	@IsString()
	readonly stateDocument: string;

	@ApiProperty({example: 'Restringido'})
	@IsString()
	readonly nivelAcces: string;

	@ApiProperty({example: 'The resources that were sent to the data center for their ...'})
	@IsString()
	readonly description: string;

	@ApiProperty({example: ['informes', 'ventas', '2023']})
	@IsArray()
	readonly tags: string[];

	@ApiProperty({example: ['resource', 'DataCenter', 'Data']})
	@IsArray()
	readonly keywords: string[];

	@ApiProperty({example: 'roadMap-047'})
	@IsString()
	readonly roadMap: string

	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsString()
	expirationDate: Date
}