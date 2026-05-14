import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Tienda Online API')
    .setDescription(
      'API REST para gestionar clientes, productos, categorías y órdenes de compra. TAW-251 Desarrollo Web Backend.',
    )
    .setVersion('1.0')
    .addTag('Clientes', 'Gestión de clientes')
    .addTag('Categorías', 'Gestión de categorías de productos')
    .addTag('Productos', 'Gestión de productos')
    .addTag('Órdenes', 'Gestión de órdenes de compra')
    .addTag('Orden-Producto', 'Gestión de ítems dentro de una orden')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI en /docs
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Tienda Online API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      tryItOutEnabled: true,
    },
  });

  await app.listen(3000);
  console.log('Servidor corriendo en: http://localhost:3000');
  console.log('Documentacion en: http://localhost:3000/docs');
  console.log('OpenAPI JSON en: http://localhost:3000/docs-json');
}
bootstrap();
