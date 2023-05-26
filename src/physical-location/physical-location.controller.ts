import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalLocationService } from './physical-location.service';
import { CreatePhysicalLocationDto } from './dto/create-physical-location.dto';
import { UpdatePhysicalLocationDto } from './dto/update-physical-location.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('physical-location')
@Controller('physical-location')
export class PhysicalLocationController {
  constructor(private readonly physicalLocationService: PhysicalLocationService) {}

  @Post()
  @ApiOperation({
    summary: 'crear nueva localisacion fisica para documento',
    requestBody: {
      content: {
        'aplication/json': {
          schema: {
            type: 'object',
            properties: {
              physicalPlace: {type: 'string'},
              description: {type: 'string'},
              notes: {type: 'string'},
            },
          },
        },
      },
    },
  })
  create(@Body() createPhysicalLocationDto: CreatePhysicalLocationDto) {
    return this.physicalLocationService.create(createPhysicalLocationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'ver todas las localizaciones fisicas documento',
  })
  findAll() {
    return this.physicalLocationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'actualizar una localizacion fisica documento',
  })
  findOne(@Param('id') id: number) {
    return this.physicalLocationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'actualizar una localizacione fisica documento',
  })
  update(@Param('id') id: number, @Body() updatePhysicalLocationDto: UpdatePhysicalLocationDto) {
    return this.physicalLocationService.update(id, updatePhysicalLocationDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'eliminar una localizacione fisica documento',
  })
  remove(@Param('id') id: number) {
    return this.physicalLocationService.remove(+id);
  }
}
