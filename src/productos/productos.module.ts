import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), CategoriasModule],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService, TypeOrmModule],
})
export class ProductosModule {}
