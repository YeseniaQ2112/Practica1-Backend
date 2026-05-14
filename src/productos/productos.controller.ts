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
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos', description: 'Retorna un arreglo con todos los productos registrados, incluyendo su categoría.' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente.' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID', description: 'Retorna los datos de un producto específico junto con su categoría.' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto', description: 'Registra un nuevo producto. Requiere un idCategoria existente.' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto', description: 'Actualiza parcialmente los datos de un producto existente.' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto o categoría no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto', description: 'Realiza una eliminación lógica (soft delete) del producto.' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
