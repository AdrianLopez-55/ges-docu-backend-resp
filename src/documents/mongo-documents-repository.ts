import { DocumentsRepository } from "./documents-repository";
import { CreateDocumentDTO } from "./dto/createDocument.dto";
import { Document } from "./entities/documents.entity";
import { InjectModel } from '@nestjs/mongoose'
import { DocumentsModel } from './schema/documents.schema'

export class MongoDocumentRepository implements DocumentsRepository {
	constructor(@InjectModel(Document.name) private readonly documentModel : DocumentsModel){}

	async create(createDocumentDTO: CreateDocumentDTO): Promise<Document> {
		const document = await new this.documentModel(createDocumentDTO).save();
		console.log('createDocumentDTO', createDocumentDTO);
		return new Document();
	}
	
}