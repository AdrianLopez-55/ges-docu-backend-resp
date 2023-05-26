import { Injectable } from '@nestjs/common';
import { RegistryDocument } from './entities/documents.entity';
import { updateDocumentDTO } from './dto/updateDocument.dto';

@Injectable()
export class DocumentsService {

	private documents: RegistryDocument[] = [
	{
		id: '5467iu',
		title: 'string',
		author: 'string',
		dateModify: 'string',
		dateCreation: 'string',
		documentType: 'string',
		signatories: 'string',
		state: 'string',
		description: 'string',
		lastDateRetention: 'string',
	},
	];

	getAllDocument() {
		return this.documents;
	}

	createDocument(
		title: string,
		author: string,
		dateModify: string,
		dateCreation: string,
		documentType: string,
		signatories: string,
		state: string,
		description: string,
		lastDateRetention: string,
	) {
		const document = {
			id: '34324rwer',
			title,
			author,
			dateModify,
			dateCreation,
			documentType,
			signatories,
			state,
			description,
			lastDateRetention,
		}
		this.documents.push(document);
		return document;
	}

	deleteDocument(id: string) {
		this.documents = this.documents.filter(document => document.id !== id)
	}

	getDocumentById(id: string): RegistryDocument{
		return this.documents.find(document => document.id === id)
	}

	updateDocument(id: string, updateFields: updateDocumentDTO): RegistryDocument {
		const document = this.getDocumentById(id)
		const newDocument = Object.assign(document, updateFields)
		this.documents.map(document => document.id === id ? newDocument : document)
		return newDocument;
	}
}
