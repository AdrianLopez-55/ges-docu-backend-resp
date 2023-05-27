import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),);
  // app.useGlobalGuards(new AuthGuard()); 
  
  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('api login auth and registry documents')
  .setVersion('1.0')
  .addTag('validate user')
  .addTag('Registry Documents')
  .addTag('Road-map')
  .addTag('milestones')
  .addTag('additional-metadata')
  .addTag('physical-location')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
