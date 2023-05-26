import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  const config = new DocumentBuilder()
  .setTitle('User verification')
  .setDescription('verification if exist user in the system')
  .setVersion('1.0')
  .addTag('User verification')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const documentApi = new DocumentBuilder()
  .setTitle('document api rest')
  .setDescription('document API use from crud document')
  .setVersion('2.0')
  .addTag('doument api rest crud')  
  .build();
  const document2 = SwaggerModule.createDocument(app, documentApi);
  SwaggerModule.setup('api/document', app, document2);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(Number(port));
}
bootstrap();
