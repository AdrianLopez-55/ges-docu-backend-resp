import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Documents, DocumentsSchema } from './schema/documents.schema';
import { SequenceService } from './sequenceService.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Documents.name, schema: DocumentsSchema}
  ])],
  controllers: [DocumentsController],
  providers: [DocumentsService, SequenceService]
})
export class DocumentsModule {}
