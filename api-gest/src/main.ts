import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usa morgan para registrar las solicitudes HTTP
  app.use(morgan('dev'));

  // Usa cors para habilitar las solicitudes CORS
  app.use(cors());

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Api Gest')
    .setDescription('API para la gestión de Usuarios')
    .setVersion('1.0')
    .addBearerAuth() // Agregar autenticación con JWT si la usas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
