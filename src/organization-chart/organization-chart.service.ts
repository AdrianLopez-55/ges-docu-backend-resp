import { Injectable } from '@nestjs/common';
import { CreateOrganizationChartDto } from './dto/create-organization-chart.dto';
import { UpdateOrganizationChartDto } from './dto/update-organization-chart.dto';
import getConfig from '../config/configuration'
import axios from 'axios';

@Injectable()
export class OrganizationChartService {

  public async findAll(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      throw new Error('Error al obtener los datos de organization chart')
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} organizationChart`;
  }

  update(id: string, updateOrganizationChartDto: UpdateOrganizationChartDto) {
    return `This action updates a #${id} organizationChart`;
  }

  remove(id: string) {
    return `This action removes a #${id} organizationChart`;
  }
}
