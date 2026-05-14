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
import { Categoria } from '../categorias/categoria.entity';
import { OrdenProducto } from '../orden-producto/orden-producto.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column({ name: 'idCategoria' })
  idCategoria: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizadoEn' })
  actualizadoEn: Date;

  @DeleteDateColumn({ name: 'eliminadoEn', nullable: true })
  eliminadoEn: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @OneToMany(() => OrdenProducto, (op) => op.producto)
  ordenProductos: OrdenProducto[];
}
