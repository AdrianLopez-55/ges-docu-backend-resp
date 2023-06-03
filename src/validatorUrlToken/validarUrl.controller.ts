import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request } from 'express'
import { HttpService } from '@nestjs/axios';

@ApiTags('validar-url')
@Controller('validar-url')
export class ValidarUrlController {
  constructor(private readonly tokenService: TokenService, private readonly httpService: HttpService) {}

  @ApiBearerAuth()
  @Get()
  @ApiResponse({ status: 200, description: 'valid token, authorized' })
  @ApiResponse({ status: 401, description: 'not vaid token'})
  async validarUrl(@Req() req: Request ) {
try {
	// console.log(req)
	const token = req.headers.authorization.split(' ')[1];
	const response = await this.httpService.get(`http://10.10.214.219:3100/auth/verifyAppToken`, {headers: {Authorization: `bearer ${token}`}}).toPromise();
	console.log(response)
	return response.data
} catch (error) {
	return error
}
  }
}