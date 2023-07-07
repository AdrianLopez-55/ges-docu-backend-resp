import { Module } from '@nestjs/common';
import { OrganizationChartService } from './organization-chart.service';
import { OrganizationChartController } from './organization-chart.controller';

@Module({
  controllers: [OrganizationChartController],
  providers: [OrganizationChartService]
})
export class OrganizationChartModule {}
