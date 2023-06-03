import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }),);
  
  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('api login auth and registry documents')
  .setVersion('1.0')
  .addTag('validate user')
  .addTag('validar-url')
  .addTag('Registry Documents')
  .addTag('Road-map')
  .addBearerAuth()
  .build();

  
  const document = SwaggerModule.createDocument(app, config);

  
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    }
  });

  //const PORT = process.env.PORT || 3000;
  await app.listen(8085);
}
bootstrap();
