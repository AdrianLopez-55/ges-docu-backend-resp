import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	private readonly apikey = process.env.API_KEY;
	validateApiKey(apikey: string): boolean {
		return this.apikey === apikey;
	}
}
