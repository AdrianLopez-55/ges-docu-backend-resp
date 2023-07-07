import { Injectable } from '@nestjs/common';
import { CreateDocumentationTypeDto } from './dto/create-documentation-type.dto';
import { UpdateDocumentationTypeDto } from './dto/update-documentation-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentationType, DocumentationTypeDocument } from './schema/documentation-type.schema';

@Injectable()
export class DocumentationTypeService {

  constructor(@InjectModel(DocumentationType.name) private readonly documentationTypeModel: Model<DocumentationTypeDocument>){};

  async create(createDocumentationTypeDto: CreateDocumentationTypeDto) {
    const { typeName } = createDocumentationTypeDto;
    const existingdocumentatuoType = await this.documentationTypeModel.findOne({ typeName }).exec();
    if (existingdocumentatuoType) {
      throw new Error('El título ya está en uso. No se permite la duplicación.');
    }
    const newDocument = new this.documentationTypeModel(createDocumentationTypeDto)
    return newDocument.save()
  }

  async findAll() {
    return this.documentationTypeModel.find().exec();
  }

  async findOne(id: string): Promise<DocumentationType> {
    return this.documentationTypeModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateDocumentationTypeDto: UpdateDocumentationTypeDto) {
    return this.documentationTypeModel.findByIdAndUpdate({ _id: id}, updateDocumentationTypeDto, { new: true });
  }

  remove(id: string) {
    return this.documentationTypeModel.findByIdAndRemove({ _id: id }).exec();
  }

  async getDocumentatioTypeByName(typeName: string): Promise<DocumentationType | null>{
    const documentationType = this.documentationTypeModel.findOne({ typeName }).exec()
    return documentationType
  }
}
