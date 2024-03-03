import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize()); // Add this line to initialize Passport
  app.use(bodyParser.json()); // Enable the JSON body parser

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(new Logger('App',{ timestamp: true }));
  await app.listen(3000);
}
bootstrap();
