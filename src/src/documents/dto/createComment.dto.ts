import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Date } from "mongoose";
import { User } from "src/users/schema/user.schema";


export class CreateCommentDto{
	@ApiProperty({example: 'JuanDolie'})
	@IsString()
	readonly author: User;

	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsString()
	readonly date: Date;

	@ApiProperty({example: 'Esto es mi comentario del documeto'})
	@IsString()
	readonly comment: string;
}