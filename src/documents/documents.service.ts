import { Injectable, Req } from '@nestjs/common';
import { UpdateDocumentDTO } from './dto/updateDocument.dto';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentDocument, Documents } from './schema/documents.schema';
import { Model } from 'mongoose';
import { Request, response } from 'express';
import { PaginationDto } from 'src/common/pagination.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class DocumentsService {

	private defaultLimit: number

	constructor(@InjectModel(Documents.name) private readonly documentModel: Model<DocumentDocument>, private readonly httpService: HttpService){}
	
	async create(createDocumentDTO: CreateDocumentDTO): Promise<Documents> {
		// const personalDataUrl = process.env.API_PERSONAL;
		// try {
		// 	const response = await this.httpService.get(`${personalDataUrl}/api/personal`).toPromise();
		// 	console.log(response.data)
		// 	const personalData = response.data;
		// 	const selectedAutor = personalData.name;
		// 	console.log(selectedAutor)
		// 	const documentToRegister = {
		// 		...createDocumentDTO,
		// 		authorDocument: selectedAutor,
		// 	};

		// const createdDocument = new this.documentModel(documentToRegister);
		// console.log(createdDocument)
		// const savedDocument = await createdDocument.save();
		// return savedDocument
		// } catch (error){
		// 	console.log(error);
		// 	throw new Error('error al registrar documento')
		// }
		return this.documentModel.create(createDocumentDTO);
	}

	// getPersonalId(_id: string): Observable<any>{
	// 	const url = `${process.env.API_PERSONAL}/api/personal/${_id}`
	// 	return this.httpService.get(url).pipe(
	// 		map(response => response.data),
	// 	)
	// }
	

	async findAll(request: Request): Promise<Documents[]> {
		//const sortOptions = sort ? { [sort]: 1 } : {};
		return this.documentModel.find(request.query).sort({numberDocument: 1}).setOptions({sanitizeFilter: true}).exec();
	}

	async findDocumentsActive(): Promise<Documents[]>{
		return this.documentModel.find(({active: true})).sort({numberDocument: 1}).exec();
	}

	async findDocumentsInactive(): Promise<Documents[]>{
		return this.documentModel.find(({active: false})).exec();
	}

	findAllPaginate( paginationDto: PaginationDto ) {
		const { limit = this.defaultLimit, offset = 0 } = paginationDto;
		return this.documentModel.find({active: true})
		  .limit( limit )
		  .skip( offset )
	}

	async findOne(id: string): Promise<Documents>{
		return this.documentModel.findOne({_id: id}).exec();
	}

	async getVersion(id: string): Promise<Documents>{
		const versions = await this.documentModel.findOne({_id:id}).select('-__v')
		return versions;
	}

	async update(id: string, updateDocumentDTO: UpdateDocumentDTO) {
		const document = this.documentModel.findOneAndUpdate({ _id: id }, updateDocumentDTO, {new: true},).exec();
		return (await document).save();
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

	async activerDocument(id: string, active: boolean){
		const document: DocumentDocument = await this.documentModel.findById(id);
		document.active = true;
		await document.save();
		return document
	}
}