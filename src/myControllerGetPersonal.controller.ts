// import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
// import { ExternalDataService } from './externalDataService.service';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('personal')
// @Controller('personal')
// export class MyController {
//   constructor(private readonly externalDataService: ExternalDataService) {}

//   @Get('external-data')
//   @ApiOperation({
// 		summary: 'Otener datos de microservicio personal',
// 	})
//   public async getExternalData(): Promise<any> {
//     const url = 'https://late-pine-8921.fly.dev/api/personal';

//     try {
//       const data = await this.externalDataService.fetchDataFromExternalServer(url);
//       return data;
//     } catch (error) {
//       return 'Error al obtener los datos del servidor externo';
//     }
//   }

// }