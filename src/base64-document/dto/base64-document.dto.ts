import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";



export class Base64DocumentDto {
	// @ApiProperty()
	// @IsString()
	// readonly mime: string

	@ApiProperty()
	@IsString()
	readonly base64: string
}

export class UploadDocumentDto {
	@ValidateNested()
	@Type(() => Base64DocumentDto)
	file: Base64DocumentDto
}