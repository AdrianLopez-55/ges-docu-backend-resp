import { PartialType } from '@nestjs/swagger';
import { CreateAdditionalMetadatumDto } from './create-additional-metadatum.dto';

export class UpdateAdditionalMetadatumDto extends PartialType(CreateAdditionalMetadatumDto) {
	keywords: string[]
	tags: string[]
	dateInit: string
	dateEnd: string
	responsible: string
	departament: string
}
