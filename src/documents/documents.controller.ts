import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, Req, Query, Put } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocumentDTO } from './dto/updateDocument.dto'
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
	@ApiNotFoundResponse({ description: 'The documents cant find'})
	@ApiQuery({name: 'numberDOocument', required: false, description: 'search document by numer document'})
	@ApiQuery({name: 'title', required: false, description: 'search document by title'})
	@ApiQuery({name: 'author', required: false, description: 'search document by author'})
	@ApiResponse({ status: 200, description: 'doument found'})
	findAll(@Req() request: Request){
		return this.documentsService.findAll(request);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'search document by id',
	})
	findOne(@Param('id', ParseObjectIdPipe) id: string){
		return this.documentsService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'actuaizar un documento',
	  })
	async update(@Param("id") id: string, @Body() updateDocumentDTO: UpdateDocumentDTO){
		const document = await this.documentsService.findOne(id)
		if(!document.active){
			throw new ForbiddenException('documento inactivo')
		}
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
