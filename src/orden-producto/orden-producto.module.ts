import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenProducto } from './orden-producto.entity';
import { OrdenProductoController } from './orden-producto.controller';
import { OrdenProductoService } from './orden-producto.service';
import { OrdenesModule } from '../ordenes/ordenes.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenProducto]),
    OrdenesModule,
    ProductosModule,
  ],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
  exports: [OrdenProductoService],
})
export class OrdenProductoModule {}
