import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ApiController } from "src/ServiceApi/api.controller";

export class UpdateDocumentDTO {
	@ApiProperty()
	@IsString()
	title: string;
	@ApiProperty()
	@IsString()
	author: string;
	@ApiProperty()
	@IsString()
	dateModify: string;
	@ApiProperty()
	@IsString()
	dateCreation: string;
	@ApiProperty()
	@IsString()
	documentType: string;
	@ApiProperty()
	@IsString()
	signatories: string;
	@ApiProperty()
	@IsString()
	state: string
	@ApiProperty()
	@IsString()
	description: string;
	@ApiProperty()
	@IsString()
	lastDateRetention: string;
}