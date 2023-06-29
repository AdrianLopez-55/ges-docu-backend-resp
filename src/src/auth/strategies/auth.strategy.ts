import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
	constructor(private authService: AuthService) {
		super({header: 'authoritation', prefix: 'apikey_'}, true, (authorization, done) => {
			const checkKey = authService.validateApiKey(authorization);
			if(!checkKey) {
				return done(false);
			}
			return done(true);
		});
	}
}