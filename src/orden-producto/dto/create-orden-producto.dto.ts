import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrdenProductoDto {
  @ApiProperty({ example: 1, description: 'ID de la orden' })
  @IsNotEmpty({ message: 'El idOrden es obligatorio' })
  @IsInt({ message: 'El idOrden debe ser un número entero' })
  @IsPositive()
  idOrden: number;

  @ApiProperty({ example: 2, description: 'ID del producto' })
  @IsNotEmpty({ message: 'El idProducto es obligatorio' })
  @IsInt({ message: 'El idProducto debe ser un número entero' })
  @IsPositive()
  idProducto: number;

  @ApiProperty({ example: 3, description: 'Cantidad del producto en la orden' })
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor a 0' })
  cantidad: number;

  @ApiProperty({ example: 4500.99, description: 'Precio unitario al momento de la compra' })
  @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
  @IsNumber({}, { message: 'El precio unitario debe ser un número' })
  @IsPositive({ message: 'El precio unitario debe ser positivo' })
  precioUnitario: number;
}
