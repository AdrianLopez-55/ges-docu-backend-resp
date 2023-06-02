import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, Req, Query, Put, ForbiddenException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocumentDTO } from './dto/updateDocument.dto'
import { ApiAcceptedResponse, ApiBadGatewayResponse, ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiDefaultResponse, ApiForbiddenResponse, ApiFoundResponse, ApiGatewayTimeoutResponse, ApiGoneResponse, ApiInternalServerErrorResponse, ApiMethodNotAllowedResponse, ApiMovedPermanentlyResponse, ApiNoContentResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiNotImplementedResponse, ApiOkResponse, ApiOperation, ApiPayloadTooLargeResponse, ApiPreconditionFailedResponse, ApiQuery, ApiRequestTimeoutResponse, ApiResponse, ApiServiceUnavailableResponse, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, ApiUnsupportedMediaTypeResponse } from '@nestjs/swagger';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { Request } from 'express';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreateCommentDto } from './dto/createComment.dto';
import { CreatePhysicalLocationDto } from './dto/createPhysicalLocation.dto';
import { CreateSignatureAprovedDto } from './dto/createSignatureAproved.dto';
import { CreateMilestoneDto } from './dto/createMilestone.dto';
import { badRequestDocDto } from './dto/responsesDto/documentResponse/badRequestDoc';
import { SequenceService } from './sequenceService.service';

	@Controller('documents')
	@ApiTags('Registry Documents')
	export class DocumentsController {

	constructor(
		private readonly documentsService:DocumentsService, 
		private readonly sequenceService: SequenceService){}

	@Post()
	@ApiOperation({summary: 'registry new document'})
	@ApiCreatedResponse({ description: 'The document has been successfully created.', type: CreateDocumentDTO})
	@ApiBadRequestResponse({description: 'bad request response', type: badRequestDocDto})
	async create(@Body() createDocumentDTO: CreateDocumentDTO){
		const numberDocument = await this.sequenceService.getNextValueNumberDocument();
		const newRegisterDocument = {
			...createDocumentDTO, numberDocument
		}
		return this.documentsService.create(newRegisterDocument);
	}

	@Get()
	@ApiOperation({
		summary: 'see all documents or search by filters',
	})
	@ApiNotFoundResponse({ description: 'The documents cant find'})
	@ApiQuery({name: 'numberDocument', required: false, description: 'search document by numer document'})
	@ApiQuery({name: 'title', required: false, description: 'search document by title'})
	@ApiQuery({name: 'authorDocument', required: false, description: 'search document by author'})
	@ApiOkResponse({description: 'documents finds', type: CreateDocumentDTO})
	@ApiNotFoundResponse({description: 'documents not founds'})
	

	// @ApiAcceptedResponse({description: 'accepted response'})
	// @ApiCreatedResponse({description: 'accepted response'})
	// @ApiMovedPermanentlyResponse({description: 'moved permanent response'})
	// @ApiFoundResponse({description: 'foud response'})
	// @ApiUnauthorizedResponse({description: 'unautorization response'})
	// @ApiForbiddenResponse({description: 'forbidden response'})
	// @ApiMethodNotAllowedResponse({description: 'method not allowed response'})
	// @ApiNotAcceptableResponse({description: 'not acceptable response'})
	// @ApiRequestTimeoutResponse({description: 'request tomeout response'})
	// @ApiConflictResponse({description: 'conflict response'})
	// @ApiPreconditionFailedResponse({description: 'precondition failed response'})
	// @ApiTooManyRequestsResponse({description: 'too many requests response'})
	// @ApiGoneResponse({description: 'gone response'})
	// @ApiPayloadTooLargeResponse({description: 'payload too large response'})
	// @ApiUnsupportedMediaTypeResponse({description: 'unsupported media type response'})
	// @ApiUnprocessableEntityResponse({description: 'unprocessable entity response'})
	// @ApiInternalServerErrorResponse({description: 'internal server error response'})
	// @ApiNotImplementedResponse({description: 'not implementted response'})
	// @ApiBadGatewayResponse({description: 'bad gateway response'})
	// @ApiServiceUnavailableResponse({description: 'service unavailable response'})
	// @ApiGatewayTimeoutResponse({description: 'gateway timeout response'})
	// @ApiDefaultResponse({description: 'default response'})
	// @ApiNoContentResponse({description: 'no content response'})

	findAll(@Req() request: Request){
		return this.documentsService.findAll(request);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'search document by id',
	})
	@ApiOkResponse({description: 'document find'})
	@ApiNotFoundResponse({description: 'document not found or not exist'})
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
	@ApiOkResponse({description: 'document update correctly'})
	@ApiNotFoundResponse({description: 'document not found'})
	@ApiForbiddenResponse({description: 'document not use now'})
	async update(@Param("id") id: string, @Body() updateDocumentDTO: UpdateDocumentDTO){
		const document = await this.documentsService.findOne(id)
		if(!document.active){
			throw new ForbiddenException('documento inactivo')
		}
		return this.documentsService.update(id, updateDocumentDTO)
	}

	@Put(':id/inactive')
	@ApiOkResponse({description: 'document converted to inactive successfully'})
	@ApiNotFoundResponse({description: 'document not dfound or not exist'})
	@ApiOperation({
		summary: 'assign document to inactive',
	  })
	async deleteDocument(@Param('id') id: string, active: boolean,) {
		return this.documentsService.inactiverDocument(id, active)
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
	@ApiOkResponse({description: 'add physical-location correctly'})
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
	@ApiOkResponse({description: 'add comment into de document corectly'})
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
	@ApiOkResponse({description: 'approved signatures affixed to the document correctly'})
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
	@ApiOkResponse({description: 'milestones add into de document correctly'})
	async addMIlestone(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() milestone: CreateMilestoneDto,
	) {
		return this.documentsService.addMilestones(id, milestone)
	}



	
}
