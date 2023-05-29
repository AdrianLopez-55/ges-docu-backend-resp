import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Model } from "mongoose";
import { User, UserSchema } from "src/users/schema/user.schema";

export type MilestoneDocument = Milestone & Document

@Schema()
export class Milestone {
	@Prop({ type: mongoose.Schema.Types.String, ref: 'User'})
	author: User;

	@Prop()
	typeMIlestone: string;

	@Prop({default: Date.now()})
	dateComment: Date;

	@Prop()
	description: string;
}

export const MIlestoneSchema = SchemaFactory.createForClass(Milestone);
export type MilestoneModel = Model<Milestone>;