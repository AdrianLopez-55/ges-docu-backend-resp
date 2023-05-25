import { ApiProperty } from "@nestjs/swagger"

export class createDocumentDTO {
	title: string;
	author: {
		nameAuthor: string;
		departament: string;
		emailAuthor: string;
	};
	dateCreation: string;
	completionDate: {
		dateInitCompletion: string;
		dateFinishCompletion: string;
	};
	completionAuthor: {
		authorCI: Number;
		authorName: string;
		emailAuthorCompletion: string;
		departamentAuthor: string;
	};
	documentType: {
		documentTypeName: string;
		description: string;
	};
	documentVersion: {
		idVersion: string;
		numberVersion: Number;
		dateLastModification: string;
		authorModify: {
			nameAuthorModify: string;
			ciAuthor: Number;
		};
	};
	lastDateRetention: string;
	endTimeRetention: string;
	documentStatus: string;
	physicalLocation: {
		idLocation: string;
		location: string;
	};
	additionalMetadata: {
		keyword: string;
		tag: string;
		departamentBelong: string;
		levelConfidentiality: string;
	};
	registerAuthorsModify: {
		ciAuthorRegistryModify: string;
		nameAuthorRegistry: string;
		departamentAuthorRegistry: string
		dateModify: string;
	};
	associatedFolder: {
		idFolder: string;
		AssociatedSubfolder: {
			idSubfolder: string;
			nameSubfolder: string;
			departamentPropiertySubfolder: string;
		};
	};
}

export class updateDocumentDTO {
	id: string;
	title: string;
	author: {
		nameAuthor: string;
		departament: string;
		emailAuthor: string;
	};
	dateCreation: string;
	completionDate: {
		dateInitCompletion: string;
		dateFinishCompletion: string;
	};
	completionAuthor: {
		authorCI: Number;
		authorName: string;
		emailAuthorCompletion: string;
		departamentAuthor: string;
	};
	documentType: {
		documentTypeName: string;
		description: string;
	};
	documentVersion: {
		idVersion: string;
		numberVersion: Number;
		dateLastModification: string;
		authorModify: {
			nameAuthorModify: string;
			ciAuthor: Number;
		};
	};
	lastDateRetention: string;
	endTimeRetention: string;
	documentStatus: string;
	physicalLocation: {
		idLocation: string;
		location: string;
	};
	additionalMetadata: {
		keyword: string;
		tag: string;
		departamentBelong: string;
		levelConfidentiality: string;
	};
	registerAuthorsModify: {
		ciAuthorRegistryModify: string;
		nameAuthorRegistry: string;
		departamentAuthorRegistry: string
		dateModify: string;
	};
	associatedFolder: {
		idFolder: string;
		AssociatedSubfolder: {
			idSubfolder: string;
			nameSubfolder: string;
			departamentPropiertySubfolder: string;
		};
	};
}