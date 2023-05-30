import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),);
  
  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('api login auth and registry documents')
  .setVersion('1.0')
  .addTag('validate user')
  .addTag('User')
  .addTag('Registry Documents')
  .addTag('Road-map')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
