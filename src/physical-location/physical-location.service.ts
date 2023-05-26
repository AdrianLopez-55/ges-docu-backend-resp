import { Injectable } from '@nestjs/common';
import { CreatePhysicalLocationDto } from './dto/create-physical-location.dto';
import { UpdatePhysicalLocationDto } from './dto/update-physical-location.dto';
import { PhysicalLocation } from './entities/physical-location.entity';

@Injectable()
export class PhysicalLocationService {
  private physlocs: PhysicalLocation[] = [];

  create(createPhysicalLocationDto: CreatePhysicalLocationDto) {
    const physloc: PhysicalLocation = {
      idPhysicalLocation: 2433,
      physicalPlace: 'string',
      description: 'string',
      notes: 'string',
    }
    this.physlocs.push(physloc)
    return physloc;
  }

  findAll() {
    return this.physlocs;
  }

  findOne(idPhysicalLocation: number) {
    return this.physlocs.find(physloc => physloc.idPhysicalLocation === idPhysicalLocation);
  }

  update(idPhysicalLocation: number, updatePhysicalLocationDto: UpdatePhysicalLocationDto) {
    const physicalloc = this.findOne(idPhysicalLocation)
    const newPhysicalLoc = Object.assign(physicalloc, updatePhysicalLocationDto)
    this.physlocs.map(physicalloc => physicalloc.idPhysicalLocation === idPhysicalLocation)
    return newPhysicalLoc;
  }

  remove(idPhysicalLocation: number) {
    return this.physlocs = this.physlocs.filter(physicalloc => physicalloc.idPhysicalLocation !== idPhysicalLocation);
  }
}
