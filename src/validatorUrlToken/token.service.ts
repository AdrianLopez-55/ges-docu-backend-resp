import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TokenService {
  async validarToken(token: string): Promise<boolean> {
    try {
      const backendSeguridadURL = 'http://10.10.214.219:3100/api'; // Reemplaza esto con la URL real del backend de seguridad

      const response = await axios.get(`${backendSeguridadURL}/validar-token?token=${token}`);

      // Aquí procesas la respuesta del backend de seguridad
      // Por ejemplo, si recibes una respuesta exitosa con acceso al sistema
      if (response.data.acceso) {
        return true; // Token válido
      } else {
        return false; // Token inválido
      }
    } catch (error) {
      // Maneja los errores de la solicitud al backend de seguridad
      console.error(error);
      return false; // Error al validar el token
    }
  }
}