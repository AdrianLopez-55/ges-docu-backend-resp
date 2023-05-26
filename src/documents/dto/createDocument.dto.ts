import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDocumentDTO {

	@IsString()
	title: string;
	@ApiProperty()
	author: string;
	@ApiProperty()
	dateModify: string;
	@ApiProperty()
	dateCreation: string;
	@ApiProperty()
	documentType: string;
	@ApiProperty()
	signatories: string;
	@ApiProperty()
	state: string
	@ApiProperty()
	description: string
	@ApiProperty()
	lastDateRetention: string;
}