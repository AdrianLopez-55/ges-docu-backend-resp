import { PartialType } from '@nestjs/swagger';
import { CreateMilestoneDto } from './create-milestone.dto';

export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {
	name: string
	description: string
	dateInit: string
	dateEnd: string
}
