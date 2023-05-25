import { Injectable } from '@nestjs/common';
import { RegistryDocument } from './documents.entity';
import { updateDocumentDTO } from './dto/documents.dto';

@Injectable()
export class DocumentsService {

	private documents: RegistryDocument[] = [
	{
		id: '1234abc',
		title: 'string',
		author: {
			nameAuthor: 'string',
			departament: 'string',
			emailAuthor: 'string',
		},
		dateCreation: '2023-05-02',
		completionDate: {
			dateInitCompletion: 'DateIN',
			dateFinishCompletion: 'string',
		},
		completionAuthor: {
			authorCI: 0o24457,
			authorName: 'string',
			emailAuthorCompletion: 'string',
			departamentAuthor: 'string',
		},
		documentType: {
			documentTypeName: 'string',
			description: 'string',
		},
		documentVersion: {
			idVersion: 'string',
			numberVersion: 0o3205473,
			dateLastModification: 'string',
			authorModify: {
				nameAuthorModify: 'string',
				ciAuthor: 2142345,
			},
		},
		lastDateRetention: 'DateIN',
		endTimeRetention: 'string',
		documentStatus: 'string',
		physicalLocation: {
			idLocation: 'string',
			location: 'string',
		},
		additionalMetadata: {
			keyword: 'string',
			tag: 'string',
			departamentBelong: 'string',
			levelConfidentiality: 'string',
		},
		registerAuthorsModify: {
			ciAuthorRegistryModify: 'string',
			nameAuthorRegistry: 'string',
			departamentAuthorRegistry: 'string',
			dateModify: 'DateIN',
		},
		associatedFolder: {
			idFolder: 'string',
			AssociatedSubfolder: {
				idSubfolder: 'string',
				nameSubfolder: 'string',
				departamentPropiertySubfolder: 'string',
			},
		},
	},
	];

	getAllDocument() {
		return this.documents;
	}

	createDocument(
		id: string,
		title: string,
		nameAuthor: string,
		departament: string,
		emailAuthor: string,
		dateCreation: string,
		dateInitCompletion: string,
		dateFinishCompletion: string,
		authorCI: Number,
		authorName: string,
		emailAuthorCompletion: string,
		departamentAuthor: string,
		documentTypeName: string,
		description: string,
		idVersion: string,
		numberVersion: Number,
		dateLastModification: string,
		nameAuthorModify: string,
		ciAuthor: Number,
		lastDateRetention: string,
		endTimeRetention: string,
		documentStatus: string,
		idLocation: string,
		location: string,
		keyword: string,
		tag: string,
		departamentBelong: string,
		levelConfidentiality: string,
		ciAuthorRegistryModify: string,
		nameAuthorRegistry: string,
		departamentAuthorRegistry: string,
		dateModify: string,
		idFolder: string,
		idSubfolder: string,
		nameSubfolder: string,
		departamentPropiertySubfolder: string
		) {
		const document = {
			id: '457874',
			title,
			author: {
				nameAuthor,
				departament,
				emailAuthor,
			},
			dateCreation,
			completionDate: {
				dateInitCompletion,
				dateFinishCompletion,
			},
			completionAuthor: {
				authorCI,
				authorName,
				emailAuthorCompletion,
				departamentAuthor,
			},
			documentType: {
				documentTypeName,
				description,
			},
			documentVersion: {
				idVersion,
				numberVersion,
				dateLastModification,
				authorModify: {
					nameAuthorModify,
					ciAuthor,
				},
			},
			lastDateRetention,
			endTimeRetention,
			documentStatus,
			physicalLocation: {
				idLocation,
				location,
			},
			additionalMetadata: {
				keyword,
				tag,
				departamentBelong,
				levelConfidentiality,
			},
			registerAuthorsModify: {
				ciAuthorRegistryModify,
				nameAuthorRegistry,
				departamentAuthorRegistry,
				dateModify,
			},
			associatedFolder: {
				idFolder,
				AssociatedSubfolder: {
					idSubfolder,
					nameSubfolder,
					departamentPropiertySubfolder,
				},
			},
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
