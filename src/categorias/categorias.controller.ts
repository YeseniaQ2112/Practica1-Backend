import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('Categorías')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías', description: 'Retorna un arreglo con todas las categorías registradas.' })
  @ApiResponse({ status: 200, description: 'Lista de categorías obtenida correctamente.' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID', description: 'Retorna los datos de una categoría junto con sus productos.' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría encontrada.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría', description: 'Registra una nueva categoría en el sistema.' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoría creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría', description: 'Actualiza parcialmente los datos de una categoría existente.' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: 200, description: 'Categoría actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría', description: 'Realiza una eliminación lógica (soft delete) de la categoría.' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.remove(id);
  }
}
