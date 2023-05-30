import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(_id: string, name: string): Promise<any> {
        const user = await this.usersService.getUser({ _id });
        if (!user) return null;
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}





// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {
// // 	private readonly apikey = process.env.API_KEY;
// // 	validateApiKey(apikey: string): boolean {
// // 		return this.apikey === apikey;
// // 	}
// }
