import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder().setTitle("Block List").build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
