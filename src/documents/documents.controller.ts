import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocumentDTO } from './dto/updateDocument.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDocumentDTO } from './dto/createDocument.dto';


@ApiTags('Registry Documents')
@Controller('documents')
export class DocumentsController {

	private readonly logger = new Logger(DocumentsController.name);
	constructor(private readonly documentsService:DocumentsService){}
	
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
		this.logger.log('creating users in controller')
		return await this.documentsService.create(createDocumentDTO)
	}

	@Get()
	@ApiOperation({
		summary: 'ver todos los documentos creados',
	})
	async findAll(){
		return await this.documentsService.findAll();
	}


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
	async update(@Param("id") id: string, @Body() updateFields: UpdateDocumentDTO){
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
