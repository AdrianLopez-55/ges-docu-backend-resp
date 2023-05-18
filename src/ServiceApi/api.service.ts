import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LoginAuthDocumentalDTO } from './api.dto';

@Injectable()
export class ApiService {
	private readonly apiSeguridadDocumental = process.env.API_SEGURIDAD
	constructor(
		private readonly httpService: HttpService,
	) {}

	async serviceApiDocumental(){
		return "hello from services"
	}

	async loginAuthDocumental(loginAuthDocumentalDTO:LoginAuthDocumentalDTO):Promise<Observable<AxiosResponse<any[]>>>{
		console.log(loginAuthDocumentalDTO)
		const response = await this.httpService.post(`${this.apiSeguridadDocumental}/auth/login`,loginAuthDocumentalDTO).toPromise();
		return response.data
	  }
	}
