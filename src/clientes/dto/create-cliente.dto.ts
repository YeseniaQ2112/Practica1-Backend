import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Carlos', description: 'Nombres del cliente' })
  @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombres: string;

  @ApiProperty({ example: 'Mamani', description: 'Apellido paterno' })
  @IsNotEmpty({ message: 'El apellido paterno es obligatorio' })
  @IsString()
  @MaxLength(100)
  paterno: string;

  @ApiPropertyOptional({ example: 'Condori', description: 'Apellido materno' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  materno?: string;

  @ApiProperty({ example: 'juan.mamani@correo.com', description: 'Correo electrónico único' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @MaxLength(150)
  email: string;
}
