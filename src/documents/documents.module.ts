import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Documents, DocumentsSchema } from './schema/documents.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Documents.name, schema: DocumentsSchema}
  ])],
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class DocumentsModule {}
