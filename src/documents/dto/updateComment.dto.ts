import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";
import { User } from "src/users/schema/user.schema";


export class UpdateCommentDto {
	@ApiProperty({example: 'johndoe'})
	@IsString()
	readonly author: User

	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsDate()
	readonly date: Date

	@ApiProperty({example: 'Esto es mi comentario del documeto'})
	@IsString()
	readonly comment: string
}