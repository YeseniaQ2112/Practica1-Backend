import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { OrdenProductoModule } from './orden-producto/orden-producto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Añadido el argumento 10 a parseInt (buena práctica)
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'tienda_online',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Requerido por la práctica para producción en esta entrega

      // --- CORRECCIÓN CRÍTICA PARA RENDER ---
      // Si estamos en Render (producción), activa SSL. Si estás en localhost, lo ignora.
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : false,
    }),
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    OrdenesModule,
    OrdenProductoModule,
  ],
})
export class AppModule {}