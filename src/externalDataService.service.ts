import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalDataService {
  public async fetchDataFromExternalServer(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los datos del servidor externo');
    }
  }
}