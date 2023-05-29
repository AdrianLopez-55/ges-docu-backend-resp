import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
	@ApiProperty({example: 'johndoe'})
	@IsString()
	readonly _id: string;

	@ApiProperty({example: 1234567})
	@IsNumber()
	readonly ci: number;

	@ApiProperty({example: 'john Doe'})
	@IsString()
	readonly name: string;

	@ApiProperty({example: 'string@string.com'})
	@IsString()
	readonly email: string;

	@ApiProperty({example: 'activos'})
	@IsString()
	readonly departament: string;

	
}