import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CustomHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.headers.authoritation = 'apikey_'+process.env.API_KEY;
    next();
  }
}