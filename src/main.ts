import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// Si vas a usar Scalar para cumplir la rúbrica, usualmente se importa su middleware, 
// pero si tu profesor les permite usar el setup de Swagger tradicional bajo la ruta /api, 
// solo asegúrate de cambiar el endpoint.

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

  // --- CAMBIO RÚBRICA: Ruta cambiada a '/api' tal como pide el punto 5 ---
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Tienda Online API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      tryItOutEnabled: true,
    },
  });

  // --- CAMBIO OBLIGATORIO PARA RENDER: Puerto dinámico y 0.0.0.0 ---
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Servidor corriendo en el puerto: ${port}`);
  console.log(`Documentación accesible en: /api`);
}
bootstrap();