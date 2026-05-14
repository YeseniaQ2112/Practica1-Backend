import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrdenDto {
  @ApiProperty({ example: 1, description: 'ID del cliente que realiza la orden' })
  @IsNotEmpty({ message: 'El idCliente es obligatorio' })
  @IsInt({ message: 'El idCliente debe ser un número entero' })
  @IsPositive()
  idCliente: number;

  @ApiPropertyOptional({
    example: 'pendiente',
    description: 'Estado de la orden',
    enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'], {
    message: 'El estado debe ser: pendiente, procesando, enviado, entregado o cancelado',
  })
  estado?: string;
}
