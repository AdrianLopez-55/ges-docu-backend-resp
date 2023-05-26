import { ApiProperty } from "@nestjs/swagger";

export class createDocumentDTO {
	@ApiProperty()
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