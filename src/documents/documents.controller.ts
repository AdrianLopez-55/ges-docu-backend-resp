import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, Req } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocumentDTO } from './dto/updateDocument.dto'
import { ApiFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { Request } from 'express';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreateCommentDto } from './dto/createComment.dto';
import { CreatePhysicalLocationDto } from './dto/createPhysicalLocation.dto';
import { CreateSignatureAprovedDto } from './dto/createSignatureAproved.dto';
import { CreateMilestoneDto } from './dto/createMilestone.dto';
import { Documents } from './schema/documents.schema';


@Controller('documents')
@ApiTags('Registry Documents')
export class DocumentsController {

	constructor(private readonly documentsService:DocumentsService){}
	
	@Post()
	@ApiOperation({
		summary: 'crear nuevo documento',
	  })
	create(@Body() createDocumentDTO: CreateDocumentDTO){
		return this.documentsService.create(createDocumentDTO);
	}

	@Get()
	@ApiOperation({
		summary: 'ver todos los documentos creados',
	})
	@ApiOkResponse({description: 'documentos encontrados'})
	findAll(@Req() request: Request){
		return this.documentsService.findAll(request);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'ver un documento especifico creados',
	  })
	findOne(@Param('id', ParseObjectIdPipe) id: string){
		return this.documentsService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'actuaizar un documento',
	  })
	update(@Param("id") id: string, @Body() updateDocumentDTO: UpdateDocumentDTO){
		return this.documentsService.update(id, updateDocumentDTO)
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'eliminar un documento creado',
	})
	remove(@Param('id') id: string){
		return this.documentsService.remove(id);
	}

	@Post(':id/physical-location')
	@ApiOperation({
		summary: 'agregar informacion de localizacion fisica de documento especifico',
	  })
	async addPhysicalLocation(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() physicalLocation: CreatePhysicalLocationDto,
	){
		return this.documentsService.addPhysicalLocation(id, physicalLocation)
	}

	@Post(':id/comment')
	@ApiOperation({
		summary: 'agregar informacion de comentario de documento especifico',
	  })
	async addComment(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() comment: CreateCommentDto, 
	){
		return this.documentsService.addComment(id, comment)
	}

	@Post(':id/signature-aproved')
	@ApiOperation({
		summary: 'agregar informacion de firmas aprobadas de documento especifico',
	  })
	async addSignatureAproved(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() signatureAproved: CreateSignatureAprovedDto,
	){
		return this.documentsService.addSignatureAproved(id, signatureAproved)
	}

	@Post(':id/milestone')
	@ApiOperation({
		summary: 'agregar informacion de hitos de documento especifico',
	  })
	async addMIlestone(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() milestone: CreateMilestoneDto,
	) {
		return this.documentsService.addMilestones(id, milestone)
	}
}
