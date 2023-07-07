import { 
	HttpException, 
	Injectable, 
	NotFoundException, 
	GatewayTimeoutException, 
	HttpStatus,
	BadRequestException
} from '@nestjs/common';
import { UpdateDocumentDTO } from './dto/updateDocument.dto';
import { CreateDocumentDTO } from './dto/createDocument.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentDocument, Documents } from './schema/documents.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import { PaginationDto } from 'src/common/pagination.dto';
import { HttpService } from '@nestjs/axios';
import { Base64DocumentResponseDTO } from 'src/base64-document/dto/base64-document-response.dto';
import { ObtainDataPersonalDTO } from './dto/personal-result.dto';
import { DocumentationTypeService } from 'src/documentation-type/documentation-type.service';
import { DocumentationType, DocumentationTypeDocument } from 'src/documentation-type/schema/documentation-type.schema';
import { ObtainDataDocumentationTypeDto } from './dto/documentation-type-result.dto';
import { ObtainOrganigramaDto } from './dto/organigrama-result.dto';

@Injectable()
export class DocumentsService {

	private defaultLimit: number;
	private readonly apiFilesUploader = process.env.API_FILES_UPLOADER;

	constructor(
		@InjectModel(Documents.name) private readonly documentModel: Model<DocumentDocument>, 
	private readonly httpService: HttpService, 
	private readonly documentationTypeService: DocumentationTypeService,
	@InjectModel(DocumentationType.name) private readonly documentationTypesModel: Model<DocumentationTypeDocument>){}
	
	async create(createDocumentDTO: CreateDocumentDTO): Promise<Documents | any> {
		//-------------- Personal ---------------------
		const personalDataUrl = `${process.env.API_PERSONAL_GET}?ci=${encodeURIComponent(createDocumentDTO.ciPersonal)}`;
		//--------------- archivo --------------
		const { file } = createDocumentDTO
		//----------------- tipo documento ----------------
		const { documentType } = createDocumentDTO;
		//-----------------destino documento ----------------
		const { documentDestinations } = createDocumentDTO

		//-------------------- Registro de tipo documento -----------
		const infoDocumentationType = `${process.env.API_DOCUMENTATION_TYPE}?typeName=${encodeURIComponent(createDocumentDTO.documentType)}`;
		const responseDocumentationType = await this.httpService.get(infoDocumentationType).toPromise();
		//--------------------- registro organigrama -------------------
		const organigramaNameUrl = `${process.env.API_ORGANIZATION_CHART_MAIN}?name=${encodeURIComponent(createDocumentDTO.documentDestinations)}`
		const respnseOrgranigramaNAmeUrl = await this.httpService.get(organigramaNameUrl).toPromise();
		// try {
		// 	//------------registro organigrama
		// 	const organigramaList = respnseOrgranigramaNAmeUrl.data
		// 	console.log(organigramaList)
		// 	const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.nameOrganigrama === createDocumentDTO.documentDestinations);
		// 	if(!organigramaData){
		// 		console.log('No existe el organigrama')
		// 	}
		// 	const { children } = organigramaData;
		// 	let documentDestinations = [];
		// 	const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
		// 	documentDestinations.push(reciveOrganigramaData)
		// 	console.log('documentDestinaiton ya con dato dentro de string')
		// 	console.log(documentDestinations)
		// 	//-----------------------------------------------------

		// 	//------------ registro tipo document ---------------------
		// 	const documentationTypeList = responseDocumentationType.data
		// 	if(documentationTypeList.length === 0){
		// 		throw new Error('Tipo de documento no existe')
		// 	}
		// 	const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === createDocumentDTO.documentType)
		// 	console.log(documentationTypeData)
		// 	if(!documentationTypeData){
		// 		try {
		// 			console.log('error de no existe docu')
		// 			throw new BadRequestException('no existe docu') 
		// 		} catch(error){	
		// 		}
		// 	}
		// 	const { typeName } = documentationTypeData
		// 	let documentationType = {}
		// 	documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
		// 	//---------------------------------------------------------------------------


		// 	const newDocument = new this.documentModel({...createDocumentDTO, documentationType, documentDestinations});
		// 	console.log('esto es newDocument')
		// 	console.log(newDocument)
		// 	return newDocument
		// } catch (error) {
		// 	throw new BadRequestException('no existe docu') 
		// }
		// //------------------------------------------------------------
		if(file){
			const mimeType = file.split(';')[0].split(':')[1];
			const base64 = file.split(',')[1];

			const fileObj = {
				mime: mimeType,
				base64: base64
			}
			
		try {
			
			//------------- obtain personal to register -----------
			const responsePersonal = await this.httpService.get(personalDataUrl).toPromise();
			const personalDataList = responsePersonal.data
			
			if(personalDataList.length === 0){
				throw new Error('Personal not exists')
			}

			const personalData = personalDataList.find((data: ObtainDataPersonalDTO) => data.ci === createDocumentDTO.ciPersonal);
			if (!personalData) {
				throw new Error('cant not find persoanl with that ci');
			}
	
			const { _idP, name, ci, email, phone, nationality } = personalData;
			let authorDocument = {}; 
			authorDocument = { _idAutor: _idP, name, ci, email, phone, nationality };
			//-------------------------------------------------------------------

			//------------file update register ------------
			const lengthBase64 = fileObj.base64.length;
			if(lengthBase64 < 4){
				console.log('base64 no valido')
				throw new Error('base64 not valid!')
			} else if(fileObj.mime === undefined){
				throw new Error('base64 not valid, not contain a correct mime')
			} else if(fileObj.base64 === undefined){
				throw new Error('base64 not valid, bad base64 send')
			}

			const response = await this.httpService.post(`${this.apiFilesUploader}/files/upload`, { file: fileObj }).toPromise()
			const { _id, filename, size, filePath, status, category, extension } = response.data.file;
			let fileRegister = {}
			fileRegister = {
				_idFile: _id,
				filename,
				size,
				filePath,
				status,
				category,
				extension
			}
			//---------------------------------------------------

			//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = createDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			console.log(documentationTypeList)
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === createDocumentDTO.documentType)
			
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			console.log(documentationType)
			//---------------------------------------------------------------------------
			
			//----Add new all datos ----------------------------
			const newDocument = new this.documentModel({...createDocumentDTO, fileRegister, authorDocument, documentationType, documentDestinations})
			console.log('esto es newDocument')
			console.log(newDocument)

			return newDocument.save();

		} catch (error) {
			throw new GatewayTimeoutException('Something bad hapened', {cause: new Error(), description: 'cannot get a response in time with the external service'});
		}

	  } else if(file === null){
		//---------------personal ----------------
			const responsePersonal = await this.httpService.get(personalDataUrl).toPromise();
			const personalDataList = responsePersonal.data
			// console.log('esto es personalDAtaList')
			// console.log(personalDataList)
			if(personalDataList.length === 0){
				throw new Error('No se encontró el personal 1111111')
			}

			const personalData = personalDataList.find((data: ObtainDataPersonalDTO) => data.ci === createDocumentDTO.ciPersonal);
			if (!personalData) {
				throw new Error('No se encontró el personal 2222222');
			}
			console.log('esto es personalData')
			console.log(personalData)

			const { _idPersonal, name, ci, email, phone, nationality } = personalData
			let authorDocument = {}; 
			authorDocument = { _idPersonal, name, ci, email, phone, nationality };
			//----------------------------------------------

			//--------- archivos --------------------
			let fileRegister = {};
			//----------------------------------------
			//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = createDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === createDocumentDTO.documentType)
			console.log(documentationTypeData)
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			//---------------------------------------------------------------------------

			//----------- add new data all ---------------------
			const newDocument = new this.documentModel({...createDocumentDTO, fileRegister,  authorDocument, documentationType, documentDestinations})
			console.log('esto es newDocument')
			console.log(newDocument)
			return newDocument.save();
	  } else {
		if(file === undefined){
			//----------personal -------------
			const responsePersonal = await this.httpService.get(personalDataUrl).toPromise();
			const personalDataList = responsePersonal.data
			// console.log('esto es personalDAtaList')
			// console.log(personalDataList)
			
			if(personalDataList.length === 0){
				throw new Error('No se encontró el personal 1111111')
			}

			const personalData = personalDataList.find((data: ObtainDataPersonalDTO) => data.ci === createDocumentDTO.ciPersonal);

			if (!personalData) {
				throw new Error('No se encontró el personal 2222222');
			}

			// console.log('esto es personalData')
			// console.log(personalData)
			const { _idPersonal, name, ci, email, phone, nationality } = personalData
			let authorDocument = {}; 
			authorDocument = { _idPersonal, name, ci, email, phone, nationality };
			//------------------------------------------------

			//-------------- archivos ------------------------
			let fileRegister = {};
			//------------------------------------------------

			//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = createDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === createDocumentDTO.documentType)
			console.log(documentationTypeData)
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			//---------------------------------------------------------------------------
			const newDocument = new this.documentModel({...createDocumentDTO, fileRegister, authorDocument, documentationType, documentDestinations})
			return newDocument.save();
		}
	  }
	  
	 return this.documentModel.create(createDocumentDTO)
	}

	async findAll(request: Request): Promise<Documents[]> {
		return this.documentModel.find(request.query).sort({numberDocument: 1}).setOptions({sanitizeFilter: true}).exec();
	}

	async findDocumentsActive(query: any): Promise<Documents[]>{
		return this.documentModel.find(query).sort({numberDocument: 1}).setOptions({sanitizeFilter: true}).exec();
	}

	async findDocumentsInactive(query: any): Promise<Documents[]>{
		return this.documentModel.find(query).sort({numberDocument: 1}).setOptions({sanitizeFilter: true}).exec();
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

	async getDocumentVersion(id: string, version: number): Promise<Documents> {
		const document = await this.documentModel
		  .findOne({ _id: id, __v: version })
		  .select('-__v')
		  .lean()
		  .exec();
	  
		if (!document) {
		  throw new NotFoundException('Versión del documento no encontrada');
		}
	  
		return document;
	  }

	  async update(id: string, updateDocumentDTO: UpdateDocumentDTO): Promise<Documents> {
		const findDocument = await this.documentModel.findById(id)
		const personalDataUrl = `${process.env.API_PERSONAL_GET}?ci=${encodeURIComponent(updateDocumentDTO.ciPersonal)}`;
		//-------------------- Registro de tipo documento -----------
		const infoDocumentationType = `${process.env.API_DOCUMENTATION_TYPE}?typeName=${encodeURIComponent(updateDocumentDTO.documentType)}`;
		const responseDocumentationType = await this.httpService.get(infoDocumentationType).toPromise();
		//--------------------- registro organigrama -------------------
		const organigramaNameUrl = `${process.env.API_ORGANIZATION_CHART_CHILDREN4}?name=${encodeURIComponent(updateDocumentDTO.documentDestinations)}`
		const respnseOrgranigramaNAmeUrl = await this.httpService.get(organigramaNameUrl).toPromise();
		
		if(!findDocument.active){
			throw new HttpException('document Inactive', 403)
		}
		if(!findDocument){
			throw new HttpException('document not exist', 404)
		}

		const { file } = updateDocumentDTO;
		const { ciPersonal } = updateDocumentDTO
		//--------- todos los casos en los que base64 se envio de manera correcta
		if(file && file.startsWith('data')){
			const mimeType = file.split(';')[0].split(':')[1];
			const base64 = file.split(',')[1];

			const fileObj = {
				mime: mimeType,
				base64: base64
			};
			if(findDocument.fileRegister){
				if(findDocument.authorDocument){
					try {

						//--------------------------update personal---------------------------------
						const responsePersonal = await this.httpService.get(personalDataUrl).toPromise();
						const personalDataList = responsePersonal.data
						
						if(personalDataList.length === 0){
							throw new Error('Personal not exists')
						}
			
						const personalData = personalDataList.find((data: ObtainDataPersonalDTO) => data.ci === updateDocumentDTO.ciPersonal);
						if (!personalData) {
							throw new Error('cant not find persoanl with that ci');
						}
				
						const { _idPersonal, name, ci, email, phone, nationality } = personalData;
						let authorDocument = {}; 
						authorDocument = { _idPersonal, name, ci, email, phone, nationality };
						//--------------------------------------------------------------------------
						
						//------------------------update files ----------------------------------
							const response = await this.httpService.post(`${this.apiFilesUploader}/files/upload`, { file: fileObj }).toPromise()
							const { _id, filename, size, filePath, status, category, extension } = response.data.file;
							let fileRegister = {}
							fileRegister = {
								_id,
								filename,
								size,
								filePath,
								status,
								category,
								extension
							}
						//-----------------------------------------------------------------

						//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = updateDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			console.log(documentationTypeList)
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === updateDocumentDTO.documentType)
			
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			console.log(documentationType)
			//---------------------------------------------------------------------------
						
						
							//------- update con ci vacio ---------
							if(ciPersonal === ""){
								updateDocumentDTO.ciPersonal = findDocument.authorDocument.toString();
								const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO}, {new: true}).exec();
								return document
							}
							
							
							//--------------------- add new updtate document ------------
							const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO, fileRegister, authorDocument, documentationType, documentDestinations}, {new: true}).exec();
							console.log('nuevos datos puestos')
							console.log(document)
							return document;
		
					} catch (error){
						throw error.response?.data
					}
				} else {
					try {
						if(findDocument.authorDocument === null){
							//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = updateDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			console.log(documentationTypeList)
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === updateDocumentDTO.documentType)
			
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			console.log(documentationType)
			//---------------------------------------------------------------------------

							updateDocumentDTO.ciPersonal = null
							const response = await this.httpService.post(`${this.apiFilesUploader}/files/upload`, { file: fileObj }).toPromise()
							const { _id, filename, size, filePath, status, category, extension } = response.data.file;
							let fileRegister = {}
							fileRegister = {
								_id,
								filename,
								size,
								filePath,
								status,
								category,
								extension
							}
							const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO, fileRegister, documentationType, documentDestinations}, {new: true}).exec();
							return document;
						}
						//-------------------


						updateDocumentDTO.ciPersonal = findDocument.authorDocument.toString()
						const response = await this.httpService.post(`${this.apiFilesUploader}/files/upload`, { file: fileObj }).toPromise()
							const { _id, filename, size, filePath, status, category, extension } = response.data.file;
							let fileRegister = {}
							fileRegister = {
								_id,
								filename,
								size,
								filePath,
								status,
								category,
								extension
							}
							const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO, fileRegister}, {new: true}).exec();
							return document;
						
					}catch (error){
						throw new Error('Datos no validos')
					}
				}
			} else {
				try {


					//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = updateDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			console.log(documentationTypeList)
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === updateDocumentDTO.documentType)
			
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			console.log(documentationType)
			//---------------------------------------------------------------------------
					//--------------------------------------------------------------
					const response = await this.httpService.post(`${this.apiFilesUploader}/files/upload`, { file: fileObj }).toPromise();
					const { _id, filename, size, filePath, status, category, extension } = response.data.file;
					let fileRegister = {}
					fileRegister = {
						_id,
						filename,
						size,
						filePath,
						status,
						category,
						extension
					}
					
					const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO, fileRegister, documentationType, documentDestinations}, {new: true}).exec();
					console.log('document para segundo caso de fileregister')
					console.log(document)
					return document;
				} catch (error){
					throw error.response?.data;
				}
			}
		} else {
			//----------- if para caso de que fileregister se envie vacio y haya null en dato fileregister ----------
			if(findDocument.fileRegister === null){
				console.log('es null fileregister')
				updateDocumentDTO.file = null;

				// ------------ edicion ciPersonal si base64 se envia vacio ----------------
				const responsePersonal = await this.httpService.get(personalDataUrl).toPromise();
				const personalDataList = responsePersonal.data
				
				
				if(personalDataList.length === 0){
					throw new Error('Personal not exists')
				}
	
				const personalData = personalDataList.find((data: ObtainDataPersonalDTO) => data.ci === updateDocumentDTO.ciPersonal);
				if (!personalData) {
					throw new Error('cant not find persoanl with that ci');
				}
		
				const { _idPersonal, name, ci, email, phone, nationality } = personalData;
				let authorDocument = {}; 
				authorDocument = { _idPersonal, name, ci, email, phone, nationality };

				//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = updateDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			console.log(documentationTypeList)
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === updateDocumentDTO.documentType)
			
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			console.log(documentationType)
			//---------------------------------------------------------------------------

				const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO, authorDocument, documentationType, documentDestinations}, {new: true}).exec();
				console.log(document)
				return document
			}

			console.log('se envio vacio file y con datos en fileRegister para mantener')
			
			updateDocumentDTO.file = findDocument.fileRegister.toString()
			//---------------- update ciPersonal si se envia vacio en file y hay datos ya registrados de fileregister
			const responsePersonal = await this.httpService.get(personalDataUrl).toPromise();
			const personalDataList = responsePersonal.data
			
			if(personalDataList.length === 0){
				throw new Error('Personal not exists')
			}

			const personalData = personalDataList.find((data: ObtainDataPersonalDTO) => data.ci === updateDocumentDTO.ciPersonal);
			if (!personalData) {
				throw new Error('cant not find persoanl with that ci');
			}
			//------- update con ci vacio ---------
			if(ciPersonal === ""){
				updateDocumentDTO.ciPersonal = findDocument.authorDocument.toString();
				const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO}, {new: true}).exec();
				return document
			}
	
			const { _idPersonal, name, ci, email, phone, nationality } = personalData;
			let authorDocument = {}; 
			authorDocument = { _idPersonal, name, ci, email, phone, nationality };

			//------------registro organigrama
			const organigramaList = respnseOrgranigramaNAmeUrl.data
			function searchInTree(data, name) {
				for (let i = 0; i < data.length; i++) {
				  const item = data[i];
				  if (item.name === name) {
					return {
					  id: item._id,
					  name: item.name,
					  children: item.children
					};
				  }
				  if (item.children && item.children.length > 0) {
					const result = searchInTree(item.children, name);
					if (result) {
					  return result;
					}
				  }
				}
				return null;
			}


			const searchName = updateDocumentDTO.documentDestinations;
			const result = searchInTree(organigramaList, searchName)
			if(result){
				console.log('existe nombre mediante for')
				console.log('ID: ', result.id);
				console.log('Nombre: ', result.name)
				console.log('Children: ', result.children)
				
			} else {
				console.log('no se encontro el nombre json')
			}
			// console.log(organigramaList)
			// const organigramaData = organigramaList.find((data: ObtainOrganigramaDto) => data.name === createDocumentDTO.documentDestinations);
			// console.log('est es organigrama')
			// console.log(organigramaData)
			// if(!organigramaData){
			// 	console.log('No existe el organigrama')
			// }
			// const { children } = organigramaData;
			let documentDestinations = [];
			// const reciveOrganigramaData = {_idOrganigrama: organigramaData._id, nameOrganigrama: organigramaData.name, children}
			documentDestinations.push(result)
			console.log('documentDestinaiton ya con dato dentro de string')
			console.log(documentDestinations)
			//-----------------------------------------------------

			//------------ registro tipo document ---------------------
			const documentationTypeList = responseDocumentationType.data
			console.log(documentationTypeList)
			if(documentationTypeList.length === 0){
				throw new Error('Tipo de documento no existe')
			}
			const documentationTypeData = documentationTypeList.find((data: ObtainDataDocumentationTypeDto) => data.typeName === updateDocumentDTO.documentType)
			
			if(!documentationTypeData){
				try {
					console.log('error de no existe docu')
					throw new BadRequestException('no existe docu') 
				} catch(error){	
				}
			}
			const { typeName } = documentationTypeData
			let documentationType = {}
			documentationType = { _idDocumentationType: documentationTypeData._id, typeName }
			console.log(documentationType)
			//---------------------------------------------------------------------------

			const document = this.documentModel.findOneAndUpdate({ _id: id }, {$inc: {__v: 1}, ...updateDocumentDTO, authorDocument, documentationType, documentDestinations}, {new: true}).exec();
			console.log(document)
			return document
			
		}
	}

	async remove(id: string) {
		return this.documentModel.findByIdAndRemove({ _id: id}).exec();
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

	async filesUploader(createDocumentDTO:CreateDocumentDTO, res: Response) {
		const { file } = createDocumentDTO
		if(file){
			const mimeType = file.split(';')[0].split(':')[1];
			const base64 = file.split(',')[1];

			const fileObj = {
				mime: mimeType,
				base64: base64
			}

		try {
			const response = await this.httpService.post(`${this.apiFilesUploader}/files/upload`, { file: fileObj }).toPromise()
			const { _id, filename, size, filePath, status, category, extension } = response.data.file;

			const base64DocumentResponseDTO: Base64DocumentResponseDTO = {
				_id: _id,
				filename: filename,
				extension: extension,
				size: size,
				filePath: filePath,
				status: status,
				category: category,
			}
			
			console.log('esto es el dto de base64document')
			console.log(base64DocumentResponseDTO)
			return base64DocumentResponseDTO

		} catch (error) {
			throw new GatewayTimeoutException('Something bad hapened', {cause: new Error(), description: 'cannot get a response in time with the external service'});
			
		}
	  }

	}

	async addDocumentationType(typeName: string):Promise<any>{
		const documentationType = await this.documentationTypeService.getDocumentatioTypeByName(typeName);
		return documentationType
	}
}