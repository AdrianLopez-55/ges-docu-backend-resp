import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose';

@Schema()
class Documents {
	@Prop({required: true, unique: true, index: true})
	title: string;
	@Prop()
	author: string;
	@Prop()
	dateModify: string;
	@Prop()
	dateCreation: string;
	@Prop()
	documentType: string;
	@Prop()
	signatories: string;
	@Prop()
	state: string
	@Prop()
	description: string
	@Prop()
	lastDateRetention: string;
	@Prop({default: Date.now()})
	updateAt: Date
	@Prop({default: Date.now()})
	createdAt: Date
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
export type DocumentsDocument = Documents & Document;
export type DocumentsModel = Model<Documents>;