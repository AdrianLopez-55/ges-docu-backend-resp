import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import {PhysicalLocation, PhysicalLocationSchema} from './phisical-location.schema'
import { Comment, CommentSchema } from './comment.schema';
import { SignatueAproved, SignatueAprovedSchema } from './signature-aproved.schema';
import { MIlestoneSchema, Milestone } from './milestone.schema';

export type DocumentDocument = Documents & Document

@Schema()
export class Documents {
	@Prop()
	numberDocument: string

	@Prop()
	title: string;

	@Prop({ type: mongoose.Schema.Types.String, ref: 'User'})
	authorDocument: User;

	@Prop()
	digitalUbication: string;

	@Prop([PhysicalLocationSchema])
	physicalLocation: PhysicalLocation[];

	@Prop()
	documentType: string;

	@Prop()
	stateDocument: string;

	@Prop()
	nivelAcces: string;

	@Prop()
	description: string;

	@Prop([String])
	tags: string[];

	@Prop([CommentSchema])
	comments: Comment[];

	@Prop([String])
	keywords: string[];

	@Prop([SignatueAprovedSchema])
	signatureAproved: SignatueAproved[];

	@Prop([MIlestoneSchema])
	milestone: Milestone[];

	@Prop()
	expirationDate: Date;

	@Prop({default: Date.now()})
	createdAt: Date

	@Prop({default: Date.now()})
	updateAt: Date
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
export type DocumentsModel = Model<Documents>;