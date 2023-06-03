import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
	




	const token = req.headers.authorization;

    // Verifica si el token existe
    if (!token) {
      res.status(401).json({ message: 'No se proporcionó un token de acceso' });
      return;
    }
    // Aquí puedes verificar el token y los permisos asociados
    // Si la autorización falla, puedes enviar una respuesta 401 (Unauthorized) o tomar la acción adecuada
    if (!esAutorizado(req)) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    // Si la autorización es exitosa, puedes continuar con el siguiente middleware o con el controlador correspondiente
    next();
  }
}

// Función de ejemplo para verificar la autorización
function esAutorizado(req: Request): boolean {
  // Aquí puedes implementar la lógica para verificar si el usuario tiene los permisos necesarios
  // Puedes acceder al token validado en req.headers.authorization o req.headers['authorization']
  // Realiza la validación según tus necesidades y devuelve true si está autorizado, de lo contrario false
  // Ejemplo básico: Verificar si existe el token en el encabezado Authorization
  const token = req.headers.authorization;
  return !!token;
}