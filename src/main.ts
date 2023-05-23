import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('User verification')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const documentApi = new DocumentBuilder()
  .setTitle('document api rest')
  .setDescription('document API use from crud')
  .setVersion('2.0')
  .build();
  const document2 = SwaggerModule.createDocument(app, documentApi);
  SwaggerModule.setup('api/document', app, document2);

  
  await app.listen(3000);
}
bootstrap();
