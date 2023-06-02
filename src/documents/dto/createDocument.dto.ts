import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateDocumentDTO {
	// @ApiProperty({example: 'DOC-001', type: String, description: 'unique document number'})
	// @IsString()
	// readonly numberDocument: string

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

}