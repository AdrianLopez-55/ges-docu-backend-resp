import { CreateDocumentDTO } from "./dto/createDocument.dto";
import { Document } from "./entities/documents.entity";

export const DOCUMENTS_REPOSITORY = 'DocumentRepository';

export interface DocumentsRepository {
	create(document: CreateDocumentDTO): Promise<Document>;
}