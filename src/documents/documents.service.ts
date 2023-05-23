import { Injectable } from '@nestjs/common';
import { Document } from './documents.entity';
import { updateDocumentDTO } from './dto/documents.dto';

@Injectable()
export class DocumentsService {

	private documents: Document[] = [
	{
		id: '1',
		title: 'firts document',
		description: 'some document',
	},
	];

	getAllDocument() {
		return this.documents;
	}

	createDocument(title: string, description: string) {
		const document = {
			id: '12sa',
			title,
			description,
		}
		this.documents.push(document);
		return document;
	}

	deleteDocument(id: string) {
		this.documents = this.documents.filter(document => document.id !== id)
	}

	getDocumentById(id: string): Document{
		return this.documents.find(document => document.id === id)
	}

	updateDocument(id: string, updateFields: updateDocumentDTO): Document {
		const document = this.getDocumentById(id)
		const newDocument = Object.assign(document, updateFields)
		this.documents.map(document => document.id === id ? newDocument : document)
		return newDocument;
	}
}
