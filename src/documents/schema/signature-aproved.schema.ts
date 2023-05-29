import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export type SignatueAprovedDocument = SignatueAproved & Document

@Schema()
export class SignatueAproved {
	@Prop()
	user: string
	@Prop()
	dateSignatured: Date
}

export const SignatueAprovedSchema = SchemaFactory.createForClass(SignatueAproved);
export type SignatueAprovedModel = Model<SignatueAproved>;