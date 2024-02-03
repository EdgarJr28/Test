import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger config.
  const configSw = new DocumentBuilder()
    .setTitle('TEST-API')
    .setDescription(
      'Todos los servicios de la API.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSw);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  const port = process.env.PORT || 3000
  await app.listen(port, '::'); // volver a colocar en 3000
  console.log(`Servidor escuchando en el puerto ${port}`);
}
bootstrap();
