import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DocumentationTypeService } from './documentation-type.service';
import { CreateDocumentationTypeDto } from './dto/create-documentation-type.dto';
import { UpdateDocumentationTypeDto } from './dto/update-documentation-type.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('documentation-type')
@ApiTags('documentation-type')
export class DocumentationTypeController {
  constructor(private readonly documentationTypeService: DocumentationTypeService) {}

  @Post()
  create(@Body() createDocumentationTypeDto: CreateDocumentationTypeDto) {
    try {
      const newDocumentationType = this.documentationTypeService.create(createDocumentationTypeDto)
      return newDocumentationType;
    } catch (error) {
      if(error instanceof Error){
        throw new BadRequestException('titulo ya existe')
      }
      throw new InternalServerErrorException('error al crear documento')
    }
    return this.documentationTypeService.create(createDocumentationTypeDto);
  }

  @Get()
  findAll() {
    return this.documentationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentationTypeService.findOne(id);
  }

  @Get('document-type/:name')
  async getDocumentTypeByName(@Param('typeName') typeName: string): Promise<any> {
    const documentType = await this.documentationTypeService.getDocumentatioTypeByName(typeName);
    return documentType;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocumentationTypeDto: UpdateDocumentationTypeDto) {
    return this.documentationTypeService.update(id, updateDocumentationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentationTypeService.remove(id);
  }
}
