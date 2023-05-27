import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoadMapService } from './road-map.service';
import { CreateRoadMapDto } from './dto/create-road-map.dto';
import { UpdateRoadMapDto } from './dto/update-road-map.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Road-map')
@Controller('road-map')
export class RoadMapController {
  constructor(private readonly roadMapService: RoadMapService) {}

  @Post()
  @ApiOperation({
    summary: 'crear nueva localisacion fisica para documento',
    requestBody: {
      content: {
        'aplication/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'},
              description: {type: 'string'},
              dateInit: {type: 'string'},
              dateEnd: {type: 'string'},
            },
          },
        },
      },
    },
  })
  async create(@Body() createRoadMapDto: CreateRoadMapDto) {
    return await this.roadMapService.create(createRoadMapDto);
  }

  @Get()
  @ApiOperation({
    summary: 'ver todas las hojas de rutas',
  })
  findAll() {
    return this.roadMapService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'buscar una hoja de ruta',
  })
  findOne(@Param('id') id: string) {
    return this.roadMapService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'actualizar una hoja de ruta',
  })
  update(@Param('id') id: string, @Body() updateRoadMapDto: UpdateRoadMapDto) {
    return this.roadMapService.update(id, updateRoadMapDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'eliminar una hoja de ruta',
  })
  remove(@Param('id') id: string) {
    return this.roadMapService.remove(id);
  }
}
