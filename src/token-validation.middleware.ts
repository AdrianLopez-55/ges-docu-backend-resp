import { Injectable, NestMiddleware } from "@nestjs/common";
import axios from "axios";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authoritation;

		try{
			const response = await axios.post('12345', { token });

			if(response.data.valid){
				console.log('token valido');
				next();
			} else {
				throw new Error('Token de autenticaion invalido')
			}
			 
		} catch (error){
			throw new Error('Error al validar el token de autenticacion')
		 }
	}
}