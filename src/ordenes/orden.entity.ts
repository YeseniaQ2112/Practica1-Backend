import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { OrdenProducto } from '../orden-producto/orden-producto.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  idOrden: number;

  @Column({ name: 'idCliente' })
  idCliente: number;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @OneToMany(() => OrdenProducto, (op) => op.orden)
  ordenProductos: OrdenProducto[];
}
