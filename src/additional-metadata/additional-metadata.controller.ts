import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdditionalMetadataService } from './additional-metadata.service';
import { CreateAdditionalMetadatumDto } from './dto/create-additional-metadatum.dto';
import { UpdateAdditionalMetadatumDto } from './dto/update-additional-metadatum.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('additional-metadata')
@Controller('additional-metadata')
export class AdditionalMetadataController {
  constructor(private readonly additionalMetadataService: AdditionalMetadataService) {}

  @Post()
  @ApiOperation({
    summary: 'crear nuevo metadatos adicionales de seguimiento al documento',
    requestBody: {
      content: {
        'aplication/json': {
          schema: {
            type: 'object',
            properties: {
              keywords: {type: 'Array[]'},
              tags: {type: 'Array[]'},
              dateInit: {type: 'string'},
              dateEnd: {type: 'string'},
              responsible: {type: 'string'},
              departament: {type: 'string'},
            },
          },
        },
      },
    },
  })
  create(@Body() createAdditionalMetadatumDto: CreateAdditionalMetadatumDto) {
    return this.additionalMetadataService.create(createAdditionalMetadatumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'mostrar todos los metadatos adicionales de seguimiento al documento',
  })
  findAll() {
    return this.additionalMetadataService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'mostrar un metadato adicional de seguimiento al documento',
  })
  findOne(@Param('id') id: number) {
    return this.additionalMetadataService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'ACtualizar un metadato adicional de seguimiento al documento',
  })
  update(@Param('id') id: number, @Body() updateAdditionalMetadatumDto: UpdateAdditionalMetadatumDto) {
    return this.additionalMetadataService.update(+id, updateAdditionalMetadatumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'eliminar un metadato adicional de seguimiento al documento',
  })
  remove(@Param('id') id: number) {
    return this.additionalMetadataService.remove(+id);
  }
}
