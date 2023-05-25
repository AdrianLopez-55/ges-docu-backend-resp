import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { createDocumentDTO, updateDocumentDTO } from './dto/documents.dto'

@Controller('documents')
export class DocumentsController {

	constructor(private documentsService:DocumentsService){}

	@Get()
	getAllDocument(){
		return this.documentsService.getAllDocument();
	}
	/*
	@Post()
	createDocument(@Body() newDocument: createDocumentDTO){
		return this.documentsService.createDocument(

		)
	}
	*/

	@Delete(':id')
	deleteDocument(@Param('id') id: string){
		this.documentsService.deleteDocument(id);
	}

	@Patch(":id")
	updateDocument(@Param("id") id: string, @Body() updateFields: updateDocumentDTO){
		return this.documentsService.updateDocument(id,updateFields)
	}
}
