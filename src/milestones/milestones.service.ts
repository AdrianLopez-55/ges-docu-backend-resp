import { Injectable } from '@nestjs/common';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { Milestone } from './entities/milestone.entity';

@Injectable()
export class MilestonesService {
  private milestones: Milestone[] = [];
  
  create(createMilestoneDto: CreateMilestoneDto) {
    const milestone: Milestone = {
      idMIlestone: 'ar243434',
      name: createMilestoneDto.name,
      description: createMilestoneDto.description,
      dateInit: createMilestoneDto.dateInit,
      dateEnd: createMilestoneDto.dateEnd,
    }
    this.milestones.push(milestone)
    return milestone;
  }

  findAll() {
    return this.milestones;
  }

  findOne(idMIlestone: string) {
    return this.milestones.find(milestone => milestone.idMIlestone === idMIlestone);
  }

  update(idMIlestone: string, updateMilestoneDto: UpdateMilestoneDto) {
    const milestone = this.findOne(idMIlestone)
    const newMilestone = Object.assign(milestone, updateMilestoneDto)
    this.milestones.map(milestone => milestone.idMIlestone === idMIlestone)
    return newMilestone;
  }

  remove(idMIlestone: string) {
    return this.milestones = this.milestones.filter(milestone => milestone.idMIlestone !== idMIlestone);
  }
}
