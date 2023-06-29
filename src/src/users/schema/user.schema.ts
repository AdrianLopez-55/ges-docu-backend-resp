import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	_id: string;
	@Prop()
	ci: number;
	@Prop()
	name: string;
	@Prop()
	email: string;
	@Prop()
	departament: string;
	@Prop({default: Date.now()})
	updateAt: Date
	@Prop({default: Date.now()})
	createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
//export type userModel = Model<User>;