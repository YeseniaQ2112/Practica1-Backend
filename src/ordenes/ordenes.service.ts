import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './orden.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Cliente } from '../clientes/cliente.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Orden[]> {
    return this.ordenRepository.find({
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
  }

  async findOne(id: number): Promise<Orden> {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: id },
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return orden;
  }

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: createOrdenDto.idCliente },
    });
    if (!cliente) {
      throw new NotFoundException(
        `Cliente con ID ${createOrdenDto.idCliente} no encontrado`,
      );
    }
    const orden = this.ordenRepository.create({
      ...createOrdenDto,
      estado: createOrdenDto.estado || 'pendiente',
      total: 0,
    });
    return this.ordenRepository.save(orden);
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    const orden = await this.findOne(id);
    Object.assign(orden, updateOrdenDto);
    return this.ordenRepository.save(orden);
  }

  async remove(id: number): Promise<{ message: string }> {
    const orden = await this.findOne(id);
    await this.ordenRepository.softDelete(orden.idOrden);
    return { message: `Orden con ID ${id} eliminada correctamente` };
  }

  async recalcularTotal(idOrden: number): Promise<void> {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden },
      relations: ['ordenProductos'],
    });
    if (orden) {
      const total = orden.ordenProductos.reduce(
        (sum, op) => sum + Number(op.precioUnitario) * op.cantidad,
        0,
      );
      await this.ordenRepository.update(idOrden, { total });
    }
  }
}
