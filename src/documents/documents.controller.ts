import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, Req, Query, Put, ForbiddenException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocumentDTO } from './dto/updateDocument.dto'
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { Request } from 'express';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreateCommentDto } from './dto/createComment.dto';
import { CreatePhysicalLocationDto } from './dto/createPhysicalLocation.dto';
import { CreateSignatureAprovedDto } from './dto/createSignatureAproved.dto';
import { CreateMilestoneDto } from './dto/createMilestone.dto';


	@Controller('documents')
	@ApiTags('Registry Documents')
	export class DocumentsController {

	constructor(private readonly documentsService:DocumentsService){}
	
	
	@Post()
	@ApiOperation({
		summary: 'registry new document',
	  })
	@ApiCreatedResponse({ description: 'The document has been successfully created.',
							type: CreateDocumentDTO})
	create(@Body() createDocumentDTO: CreateDocumentDTO){
		return this.documentsService.create(createDocumentDTO);
	}

	@Get()
	@ApiOperation({
		summary: 'see all documents or search by filters',
	})
	@ApiNotFoundResponse({ description: 'The documents cant find'})
	@ApiQuery({name: 'numberDocument', required: false, description: 'search document by numer document'})
	@ApiQuery({name: 'title', required: false, description: 'search document by title'})
	@ApiQuery({name: 'authorDocument', required: false, description: 'search document by author'})
	@ApiResponse({ status: 200, description: 'doument found'})
	findAll(@Req() request: Request){
		return this.documentsService.findAll(request);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'search document by id',
	})
	@ApiForbiddenResponse({description: 'document forbiden, document not use now'})
	async findOne(@Param('id', ParseObjectIdPipe) id: string, active: boolean){
		const document = await this.documentsService.findOne(id)
		if(!document.active){
			throw new ForbiddenException('documento inactivo')
		}
		return this.documentsService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'update document by id',
	  })
	async update(@Param("id") id: string, @Body() updateDocumentDTO: UpdateDocumentDTO){
		const document = await this.documentsService.findOne(id)
		if(!document.active){
			throw new ForbiddenException('documento inactivo')
		}
		return this.documentsService.update(id, updateDocumentDTO)
	}

	// @Delete(':id')
	// @ApiOperation({
	// 	summary: 'delete documento by id',
	// })
	// remove(@Param('id') id: string){
	// 	return this.documentsService.remove(id);
	// }

	@Post(':id/physical-location')
	@ApiOperation({
		summary: 'create dates from physical lcation',
	  })
	async addPhysicalLocation(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() physicalLocation: CreatePhysicalLocationDto,
	){
		return this.documentsService.addPhysicalLocation(id, physicalLocation)
	}

	@Post(':id/comment')
	@ApiOperation({
		summary: 'add dates from commnet document',
	  })
	async addComment(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() comment: CreateCommentDto, 
	){
		return this.documentsService.addComment(id, comment)
	}

	@Post(':id/signature-aproved')
	@ApiOperation({
		summary: 'add signatures aproved for document',
	  })
	async addSignatureAproved(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() signatureAproved: CreateSignatureAprovedDto,
	){
		return this.documentsService.addSignatureAproved(id, signatureAproved)
	}

	@Post(':id/milestone')
	@ApiOperation({
		summary: 'add milestone for documento',
	  })
	async addMIlestone(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() milestone: CreateMilestoneDto,
	) {
		return this.documentsService.addMilestones(id, milestone)
	}

	@Put(':id/inactive')
	@ApiOperation({
		summary: 'assign document to inactive',
	  })
	async deleteDocument(@Param('id') id: string, active: boolean,) {
		return this.documentsService.inactiverDocument(id, active)
	}
}
