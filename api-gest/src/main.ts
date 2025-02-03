import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usa morgan para registrar las solicitudes HTTP
  app.use(morgan('dev'));

  // Usa cors para habilitar las solicitudes CORS
  app.use(cors());
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
