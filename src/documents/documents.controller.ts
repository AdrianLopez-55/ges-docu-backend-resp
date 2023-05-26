import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { createDocumentDTO } from './dto/createDocument.dto'
import { updateDocumentDTO } from './dto/updateDocument.dto'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registry Documents')
@Controller('documents')
export class DocumentsController {

	constructor(private documentsService:DocumentsService){}

	@Get()
	getAllDocument(){
		return this.documentsService.getAllDocument();
	}

	@Get(':id')
	getDocumentById(@Param('id') id: string){
		return this.documentsService.getDocumentById(id);
	}

	@Post()
	createDocument(@Body() newDocument: createDocumentDTO){
		return this.documentsService.createDocument(
			newDocument.author,
			newDocument.dateCreation,
			newDocument.dateModify,
			newDocument.description,
			newDocument.documentType,
			newDocument.lastDateRetention,
			newDocument.signatories,
			newDocument.state,
			newDocument.title,
		)
	}

	@Delete(':id')
	deleteDocument(@Param('id') id: string){
		this.documentsService.deleteDocument(id);
	}

	@Patch(":id")
	updateDocument(@Param("id") id: string, @Body() updateFields: updateDocumentDTO){
		return this.documentsService.updateDocument(id,updateFields)
	}
}
