import { Module } from '@nestjs/common';
import { PhysicalLocationService } from './physical-location.service';
import { PhysicalLocationController } from './physical-location.controller';

@Module({
  controllers: [PhysicalLocationController],
  providers: [PhysicalLocationService]
})
export class PhysicalLocationModule {}
