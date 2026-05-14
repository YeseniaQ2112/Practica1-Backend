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
import { OrdenProductoService } from './orden-producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@ApiTags('Orden-Producto')
@Controller('orden_producto')
export class OrdenProductoController {
  constructor(private readonly ordenProductoService: OrdenProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los ítems de orden-producto', description: 'Retorna todos los registros de orden_producto con su orden y producto relacionados.' })
  @ApiResponse({ status: 200, description: 'Lista de orden-productos obtenida correctamente.' })
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ítem de orden-producto por ID', description: 'Retorna los datos de un ítem de orden_producto con su orden y producto.' })
  @ApiParam({ name: 'id', description: 'ID del ítem orden-producto', type: Number })
  @ApiResponse({ status: 200, description: 'OrdenProducto encontrado.' })
  @ApiResponse({ status: 404, description: 'OrdenProducto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordenProductoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Agregar un producto a una orden', description: 'Crea un nuevo registro en orden_producto vinculando un producto a una orden existente.' })
  @ApiBody({ type: CreateOrdenProductoDto })
  @ApiResponse({ status: 201, description: 'Producto agregado a la orden correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({ status: 404, description: 'Orden o Producto no encontrado.' })
  create(@Body() createDto: CreateOrdenProductoDto) {
    return this.ordenProductoService.create(createDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cantidad o precio de un ítem', description: 'Actualiza la cantidad o el precio unitario de un ítem de orden_producto.' })
  @ApiParam({ name: 'id', description: 'ID del ítem orden-producto', type: Number })
  @ApiBody({ type: UpdateOrdenProductoDto })
  @ApiResponse({ status: 200, description: 'OrdenProducto actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'OrdenProducto no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateOrdenProductoDto) {
    return this.ordenProductoService.update(id, updateDto);
  }

  @Delete(':id/productos/:productId')
  @ApiOperation({ summary: 'Quitar un producto de una orden', description: 'Elimina lógicamente un producto específico de un ítem de orden_producto.' })
  @ApiParam({ name: 'id', description: 'ID del ítem orden-producto', type: Number })
  @ApiParam({ name: 'productId', description: 'ID del producto a quitar', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado de la orden correctamente.' })
  @ApiResponse({ status: 404, description: 'OrdenProducto o Producto no encontrado.' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.ordenProductoService.remove(id, productId);
  }
}
