import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ example: 1, description: 'ID de la categoría a la que pertenece el producto' })
  @IsNotEmpty({ message: 'El idCategoria es obligatorio' })
  @IsInt({ message: 'El idCategoria debe ser un número entero' })
  @IsPositive()
  idCategoria: number;

  @ApiProperty({ example: 'Laptop HP 15"', description: 'Nombre del producto' })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({
    example: 'Laptop HP con procesador Intel i5, 8GB RAM',
    description: 'Descripción del producto',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 4500.99, description: 'Precio del producto' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  precio: number;

  @ApiProperty({ example: 50, description: 'Cantidad disponible en stock' })
  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;
}
