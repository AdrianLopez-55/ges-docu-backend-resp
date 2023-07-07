import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, isString } from "class-validator";
import { DocumentationType } from "src/documentation-type/schema/documentation-type.schema";

export class CreateDocumentDTO {

	@ApiProperty({example: 'Resources from DataCenter'})
	@IsString()
	readonly title: string;

	@ApiProperty({example: '8574898'})
	@IsString()
	ciPersonal: string;
	
	@ApiProperty({example: 'Costos'})
	@IsString()
	documentType: string;

	@ApiProperty({example: 'Revision'})
	@IsString()
	readonly stateDocument: string;

	@ApiProperty({example: 'derecho'})
	@IsString()
	documentDestinations: string;

	// @ApiProperty({example: 'Informes'})
	// @IsString()
	// category: string

	@ApiProperty({example: 'contract document registration for new staff. It is on revision'})
	@IsString()
	readonly description: string;

	@ApiProperty({example: 'data:@file/jpeg;base64,/9jq'})
	file: string


	// @ApiProperty({example: 'jfjoiqjenodaurieon', description: 'most be base64'})
	// @IsString()
	// readonly base64: string;

	// @ApiProperty({example: 'image/jpg', description: 'most be mime from documebt'})
	// @IsString()
	// readonly mime: string;

	// readonly filename? : string;
	// readonly extension? : string;
	// readonly category? : string;

	// constructor(fileId: string){
	// 	this.fileId = fileId;
	// }

	// @ApiProperty()
	// @IsString()
	// filename: string

	// @ApiProperty()
	// @IsString()
	// originalname: string

	// @ApiProperty()
	// @IsString()
	// filePath: string
}