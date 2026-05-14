import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
// CreateProductoDto importado también para cast de tipo en update
import { Categoria } from '../categorias/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { idCategoria: createProductoDto.idCategoria },
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoría con ID ${createProductoDto.idCategoria} no encontrada`,
      );
    }
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    const dto = updateProductoDto as Partial<CreateProductoDto>;
    if (dto.idCategoria) {
      const categoria = await this.categoriaRepository.findOne({
        where: { idCategoria: dto.idCategoria },
      });
      if (!categoria) {
        throw new NotFoundException(
          `Categoría con ID ${dto.idCategoria} no encontrada`,
        );
      }
    }
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const producto = await this.findOne(id);
    await this.productoRepository.softDelete(producto.idProducto);
    return { message: `Producto con ID ${id} eliminado correctamente` };
  }
}
