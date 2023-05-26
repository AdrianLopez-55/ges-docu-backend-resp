import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiService } from './api.service';
import { LoginAuthDocumentalDTO } from './api.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('validate user')
@Controller('api')
export class ApiController {
	constructor(
		private apiService:ApiService
	){}

	@Post("auth-documental-login")
	async authLogin(@Res() res:Response,@Body() loginAuthDocumentalDTO:LoginAuthDocumentalDTO){
		const response =  await this.apiService.loginAuthDocumental(loginAuthDocumentalDTO)
		return res.status(HttpStatus.OK).json({response});
	}
}
