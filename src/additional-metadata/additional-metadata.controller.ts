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
  findAll() {
    return this.additionalMetadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.additionalMetadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdditionalMetadatumDto: UpdateAdditionalMetadatumDto) {
    return this.additionalMetadataService.update(+id, updateAdditionalMetadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.additionalMetadataService.remove(+id);
  }
}
