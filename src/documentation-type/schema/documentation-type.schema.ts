import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export type DocumentationTypeDocument = DocumentationType & Document

@Schema({ versionKey: '__v' })
export class DocumentationType {
	@Prop()
	typeName: string;

}

export const DocumentationTypeSchema = SchemaFactory.createForClass(DocumentationType);
export type DocumentationTypeModel = Model<DocumentationType>;
