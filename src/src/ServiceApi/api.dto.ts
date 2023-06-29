import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginCentralAuthDTO{
	@ApiProperty()
	@IsString()
	app: string;
	
	@ApiProperty()
	@IsString()
	token: string;
}