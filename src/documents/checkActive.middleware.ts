import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DocumentDocument, Documents } from './schema/documents.schema';

// @Injectable()

// export class CheckActivoMiddleware implements NestMiddleware {

//   use(req: Request, res: Response, next: NextFunction) {
    

//     if (!activo) {
//       throw new ForbiddenException('El documento está inactivo');
//     }

//     next();
//   }
// }