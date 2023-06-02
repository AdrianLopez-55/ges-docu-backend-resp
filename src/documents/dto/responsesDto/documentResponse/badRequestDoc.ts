import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class badRequestDocDto{
	@ApiProperty({example: 5644578, type: Number})
	@IsNumber()
	readonly numberDocument: number

	@ApiProperty({example: 45615646, type: Number})
	@IsNumber()
	readonly title: number;

	@ApiProperty({example: '75615'})
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

	@ApiProperty({example: 'this date not should be exist'})
	@IsString()
	readonly dateNotExist: string;
}