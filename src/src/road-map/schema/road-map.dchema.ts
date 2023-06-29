import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document, Model } from "mongoose"
import { Documents } from "src/documents/schema/documents.schema";

export type RoadMapDocument = RoadMaps & Document

@Schema()
export class RoadMaps {
	@Prop()
	nameRoadMap: string;

	@Prop({ type: mongoose.Schema.Types.String, ref: 'Documents'})
	document: Documents

	@Prop()
	documentPurpose: string;

	@Prop()
	documentScope: string;

	@Prop([String])
	map: string[];

	@Prop([String])
	resources: string[];

	@Prop()
	description: string;

	@Prop()
	dateInit: string;

	@Prop()
	dateEnd: string;

	@Prop({default: Date.now()})
	updateAt: Date;

	@Prop({default: Date.now()})
	createdAt: Date;
}

export const RoadMapSchema = SchemaFactory.createForClass(RoadMaps);
export type RoadMapModel = Model<RoadMaps>;