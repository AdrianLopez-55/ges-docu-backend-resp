import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	private readonly apikey = '12345';
	validateApiKey(apikey: string): boolean {
		return this.apikey === apikey;
	}
}
