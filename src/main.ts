import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
.setTitle('E-commerce') //the title you want for your swagger docs
.setDescription('E-commerce API description') //description
.setVersion('1.0')  //version setting for the docs
.build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [], //the modules that you want to include in your swagger docs
  });
  await app.listen(3000);
}
bootstrap();
