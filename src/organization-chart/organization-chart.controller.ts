import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationChartService } from './organization-chart.service';
import { CreateOrganizationChartDto } from './dto/create-organization-chart.dto';
import { UpdateOrganizationChartDto } from './dto/update-organization-chart.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import getConfig from '../config/configuration'

@Controller('organization-chart')
@ApiTags('external-organization-chart-data')
export class OrganizationChartController {
  constructor(private readonly organizationChartService: OrganizationChartService) {}

  @Get()
  @ApiOperation({ summary: 'obtain all organization chart'})

  public async findAll(): Promise<any> {
    const url = `${process.env.API_ORGANIZATION_CHART_MAIN}`
    try {
      const data = await this.organizationChartService.findAll(url)
      return data;
    } catch (error){
      return 'Error al obtener datos del servicio organization chart'
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationChartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationChartDto: UpdateOrganizationChartDto) {
    return this.organizationChartService.update(id, updateOrganizationChartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationChartService.remove(id);
  }
}
