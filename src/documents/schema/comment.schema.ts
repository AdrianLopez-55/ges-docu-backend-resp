import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Model } from "mongoose";
import { User } from "src/users/schema/user.schema";

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
	@Prop({ type: mongoose.Schema.Types.String, ref: 'User'})
	author: User;

	@Prop()
	date: Date;

	@Prop()
	comment: string;

	@Prop({default: true})
	active: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export type CommentModel = Model<Comment>;