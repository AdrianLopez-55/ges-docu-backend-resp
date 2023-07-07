import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Documents, DocumentsSchema } from './schema/documents.schema';
import { SequenceService } from './sequenceService.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { DocumentationTypeService } from 'src/documentation-type/documentation-type.service';
import { DocumentationType, DocumentationTypeSchema } from 'src/documentation-type/schema/documentation-type.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Documents.name, schema: DocumentsSchema},
    {name: DocumentationType.name, schema: DocumentationTypeSchema}
  ]), HttpModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, SequenceService, DocumentationTypeService]
})
export class DocumentsModule {}
