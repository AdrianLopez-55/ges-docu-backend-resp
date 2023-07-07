import { PartialType } from '@nestjs/swagger';
import { CreateOrganizationChartDto } from './create-organization-chart.dto';

export class UpdateOrganizationChartDto extends PartialType(CreateOrganizationChartDto) {}
