import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDocumentalDTO{
	@ApiProperty()
	email:string;
	@ApiProperty()
	password:string;
}