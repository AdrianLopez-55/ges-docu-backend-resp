import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "src/users/schema/user.schema";

export class UpdateMilestoneDto {
	@ApiProperty({example: 'juandolie'})
	@IsString()
	readonly author: User;

	@ApiProperty({example: 'Creacion'})
	@IsString()
	readonly typeMIlestone: string;

	@ApiProperty({example: 'se creo el documento ...'})
	@IsString()
	readonly description: string;
}