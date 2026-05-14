import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenProducto } from './orden-producto.entity';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';
import { Orden } from '../ordenes/orden.entity';
import { Producto } from '../productos/producto.entity';
import { OrdenesService } from '../ordenes/ordenes.service';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private readonly ordenProductoRepository: Repository<OrdenProducto>,
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly ordenesService: OrdenesService,
  ) {}

  async findAll(): Promise<OrdenProducto[]> {
    return this.ordenProductoRepository.find({
      relations: ['orden', 'producto'],
    });
  }

  async findOne(id: number): Promise<OrdenProducto> {
    const op = await this.ordenProductoRepository.findOne({
      where: { idOrdenProducto: id },
      relations: ['orden', 'producto'],
    });
    if (!op) {
      throw new NotFoundException(`OrdenProducto con ID ${id} no encontrado`);
    }
    return op;
  }

  async create(createDto: CreateOrdenProductoDto): Promise<OrdenProducto> {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: createDto.idOrden },
    });
    if (!orden) {
      throw new NotFoundException(`Orden con ID ${createDto.idOrden} no encontrada`);
    }

    const producto = await this.productoRepository.findOne({
      where: { idProducto: createDto.idProducto },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${createDto.idProducto} no encontrado`);
    }

    const ordenProducto = this.ordenProductoRepository.create({
      idOrden: createDto.idOrden,
      idProducto: createDto.idProducto,
      cantidad: createDto.cantidad,
      precioUnitario: createDto.precioUnitario,
    });

    const saved = await this.ordenProductoRepository.save(ordenProducto);
    await this.ordenesService.recalcularTotal(createDto.idOrden);
    return saved;
  }

  async update(id: number, updateDto: UpdateOrdenProductoDto): Promise<OrdenProducto> {
    const op = await this.findOne(id);
    Object.assign(op, updateDto);
    const updated = await this.ordenProductoRepository.save(op);
    await this.ordenesService.recalcularTotal(op.idOrden);
    return updated;
  }

  async remove(idOrdenProducto: number, idProducto: number): Promise<{ message: string }> {
    const op = await this.ordenProductoRepository.findOne({
      where: { idOrdenProducto, idProducto },
    });
    if (!op) {
      throw new NotFoundException(
        `No se encontró el producto con ID ${idProducto} en la orden-producto con ID ${idOrdenProducto}`,
      );
    }
    const idOrden = op.idOrden;
    await this.ordenProductoRepository.softDelete(op.idOrdenProducto);
    await this.ordenesService.recalcularTotal(idOrden);
    return {
      message: `Producto con ID ${idProducto} eliminado de la orden-producto con ID ${idOrdenProducto}`,
    };
  }
}
