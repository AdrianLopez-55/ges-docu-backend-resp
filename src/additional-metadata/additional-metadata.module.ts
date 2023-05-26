import { Module } from '@nestjs/common';
import { AdditionalMetadataService } from './additional-metadata.service';
import { AdditionalMetadataController } from './additional-metadata.controller';

@Module({
  controllers: [AdditionalMetadataController],
  providers: [AdditionalMetadataService]
})
export class AdditionalMetadataModule {}
