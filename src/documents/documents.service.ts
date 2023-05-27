import { Injectable, Logger } from '@nestjs/common';
import { Document } from './entities/documents.entity';
import { UpdateDocumentDTO } from './dto/updateDocument.dto';
import { CreateDocumentDTO } from './dto/createDocument.dto';


@Injectable()
export class DocumentsService {
	private readonly logger = new Logger(DocumentsService.name);

	private documents: Document[] = [];
	
	create(createDocumentDTO: CreateDocumentDTO) {
		const document: Document = {
			id: 'adfasdf',
			title: createDocumentDTO.title,
			author: createDocumentDTO.author,
			dateModify: createDocumentDTO.dateModify,
			dateCreation: createDocumentDTO.dateCreation,
			documentType: createDocumentDTO.documentType,
			signatories: createDocumentDTO.signatories,
			state: createDocumentDTO.state,
			description: createDocumentDTO.description,
			lastDateRetention: createDocumentDTO.lastDateRetention,
		}
		this.documents.push(document);
		this.logger.log('creating user in service')
		return document;
	}

	async findAll() {
		return this.documents;
	}


	async remove(id: string) {
		this.documents = this.documents.filter(document => document.id !== id)
	}

	async findOne(id: string){
		return this.documents.find(document => document.id === id)
	}

	async update(id: string, updateDocumentDTO: UpdateDocumentDTO) {
		const document = this.findOne(id)
		const newDocument = Object.assign(document, updateDocumentDTO)
		this.documents.map(document => document.id === id ? newDocument : document)
		return newDocument;
	}
}
