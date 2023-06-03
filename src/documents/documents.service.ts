import { Injectable, Req } from '@nestjs/common';
import { UpdateDocumentDTO } from './dto/updateDocument.dto';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentDocument, Documents } from './schema/documents.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import { PaginationDto } from 'src/common/pagination.dto';



@Injectable()
export class DocumentsService {

	private defaultLimit: number

	constructor(@InjectModel(Documents.name) private readonly documentModel: Model<DocumentDocument>){}
	
	async create(createDocumentDTO: CreateDocumentDTO): Promise<Documents> {
		return this.documentModel.create(createDocumentDTO);
	}

	async findAll(request: Request): Promise<Documents[]> {
		return this.documentModel.find(request.query).setOptions({sanitizeFilter: true}).exec();
	}

	findAllPaginate( paginationDto: PaginationDto ) {
		const { limit = this.defaultLimit, offset = 0 } = paginationDto;
	
		return this.documentModel.find()
		  .limit( limit )
		  .skip( offset )
	  }

	async findOne(id: string): Promise<Documents>{
		return this.documentModel.findOne({_id: id}).exec();
	}

	async update(id: string, updateDocumentDTO: UpdateDocumentDTO) {
		return this.documentModel.findOneAndUpdate({ _id: id }, updateDocumentDTO, {
			new: true,
		});
	}

	async remove(id: string) {
		return this.documentModel.findByIdAndRemove({ _id: id}).exec();
	}
	
	async addPhysicalLocation(id: string, physicalLocation: any) {
		let document: DocumentDocument = await this.documentModel.findById(id);
		document.physicalLocation.push(physicalLocation);
		document.save();
		return document;
	}

	async addComment(id: string, comment: any) {
		let document: DocumentDocument = await this.documentModel.findById(id);
		document.comments.push(comment);
		document.save();
		return document;
	}

	async addSignatureAproved(id: string, signaturedAproved: any){
		let document: DocumentDocument = await this.documentModel.findById(id);
		document.signatureAproved.push(signaturedAproved);
		document.save();
		return document
	}

	async addMilestones(id: string, milestone: any){
		let document: DocumentDocument = await this.documentModel.findById(id);
		document.milestone.push(milestone);
		document.save();
		return document
	}

	async inactiverDocument(id: string, active: boolean) {
		const document: DocumentDocument = await this.documentModel.findById(id);
		document.active = false;
		await document.save();
		return document;
	}


}