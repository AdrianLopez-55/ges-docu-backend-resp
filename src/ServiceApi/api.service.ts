import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LoginAuthDocumentalDTO } from './api.dto';

@Injectable()
export class ApiService {
	private readonly apiSeguridad = process.env.API_SEGU
	constructor(
		private readonly httpService: HttpService,
	) {}

	async serviceApiDocumental(){
		return "hello from services"
	}

	async loginAuthDocumental(loginAuthDocumentalDTO:LoginAuthDocumentalDTO):Promise<Observable<AxiosResponse<any[]>>>{
		console.log(loginAuthDocumentalDTO)
		const response = await this.httpService.post(`https://billowing-wave-7639.fly.dev/auth/login`,loginAuthDocumentalDTO).toPromise();
		console.log(response.data)
		return response.data
	  }
	}
