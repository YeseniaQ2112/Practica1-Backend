import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Electrónica', description: 'Nombre de la categoría' })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional({
    example: 'Productos electrónicos y tecnológicos',
    description: 'Descripción de la categoría',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
