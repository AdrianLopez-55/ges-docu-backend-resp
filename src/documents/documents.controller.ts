import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { updateDocumentDTO } from './dto/updateDocument.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { ApiKeyGuard } from 'src/auth/guards/apikey.guard';

@ApiTags('Registry Documents')
@Controller('documents')
export class DocumentsController {
	constructor(private readonly documentsService:DocumentsService){}
	
	@UseGuards(ApiKeyGuard)
	@Post()
	@ApiOperation({
		summary: 'crear nuevo documento',
		requestBody: {
		  content: {
			'aplication/json': {
			  schema: {
				type: 'object',
				properties: {
					title: {type: 'string'},
					author: {type: 'string'},
					dateModify: {type: 'string'},
					dateCreation: {type: 'string'},
					documentType: {type: 'string'},
					signatories: {type: 'string'},
					state:{type: 'string'},
					description:{type: 'string'},
					lastDateRetention: {type: 'string'},
				},
			  },
			},
		  },
		},
	  })
	async create(@Body() createDocumentDTO: CreateDocumentDTO){
		return await this.documentsService.create(createDocumentDTO)
	}

	@UseGuards(ApiKeyGuard)
	@Get()
	@ApiOperation({
		summary: 'ver todos los documentos creados',
	})
	async findAll(){
		return await this.documentsService.findAll();
	}


	@UseGuards(ApiKeyGuard)
	@Get(':id')
	@ApiOperation({
		summary: 'ver un documento especifico creados',
	  })
	async findOne(@Param('id') id: string){
		return await this.documentsService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: 'actuaizar un documento',
	  })
	async update(@Param("id") id: string, @Body() updateFields: updateDocumentDTO){
		return await this.documentsService.update(id,updateFields)
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'eliminar un documento creado',
	})
	async remove(@Param('id') id: string){
		return await this.documentsService.remove(id);
	}


}
