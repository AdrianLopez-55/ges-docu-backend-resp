import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Document } from './entities/documents.entity';
import { DocumentsSchema } from './schema/documents.schema';
import { DOCUMENTS_REPOSITORY } from './documents-repository';
import { MongoDocumentRepository } from './mongo-documents-repository';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Document.name, schema: DocumentsSchema}
  ])],
  controllers: [DocumentsController],
  providers: [DocumentsService, {
    provide: DOCUMENTS_REPOSITORY,
    useClass: MongoDocumentRepository,
  }]
})
export class DocumentsModule {}
