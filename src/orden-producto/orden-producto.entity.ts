import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orden } from '../ordenes/orden.entity';
import { Producto } from '../productos/producto.entity';

@Entity('orden_producto')
export class OrdenProducto {
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @Column({ name: 'idOrden' })
  idOrden: number;

  @Column({ name: 'idProducto' })
  idProducto: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio_unitario' })
  precioUnitario: number;

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date;

  @ManyToOne(() => Orden, (orden) => orden.ordenProductos)
  @JoinColumn({ name: 'idOrden' })
  orden: Orden;

  @ManyToOne(() => Producto, (producto) => producto.ordenProductos)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
