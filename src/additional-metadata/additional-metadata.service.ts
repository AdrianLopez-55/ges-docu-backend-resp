import { Injectable } from '@nestjs/common';
import { CreateAdditionalMetadatumDto } from './dto/create-additional-metadatum.dto';
import { UpdateAdditionalMetadatumDto } from './dto/update-additional-metadatum.dto';
import { AdditionalMetadatum } from './entities/additional-metadatum.entity';

@Injectable()
export class AdditionalMetadataService {
  private addMetas: AdditionalMetadatum[] = [];
  


  create(createAdditionalMetadatumDto: CreateAdditionalMetadatumDto) {
    const addMeta: AdditionalMetadatum = {
      idMetadatus: 44795,
      keywords: createAdditionalMetadatumDto.keywords,
      tags: createAdditionalMetadatumDto.tags,
      dateInit: createAdditionalMetadatumDto.dateInit,
      dateEnd: createAdditionalMetadatumDto.dateEnd,
      responsible: createAdditionalMetadatumDto.responsible,
      departament: createAdditionalMetadatumDto.departament
    }
    this.addMetas.push(addMeta)
    return addMeta;
  }
  
  findAll() {
    return this.addMetas;
  }

  findOne(idMetadatus: number) {
    return this.addMetas.find(addMeta => addMeta.idMetadatus === idMetadatus);
  }

  update(idMetadatus: number, updateAdditionalMetadatumDto: UpdateAdditionalMetadatumDto) {
    const addMeta = this.findOne(idMetadatus)
    const newAddMeta = Object.assign(addMeta, updateAdditionalMetadatumDto)
    this.addMetas.map(addMeta => addMeta.idMetadatus == idMetadatus)
    return newAddMeta;
  }

  remove(idMetadatus: number) {
    return this.addMetas = this.addMetas.filter(addMeta => addMeta.idMetadatus !== idMetadatus);
  }
}
