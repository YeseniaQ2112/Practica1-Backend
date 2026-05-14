import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './orden.entity';
import { OrdenesController } from './ordenes.controller';
import { OrdenesService } from './ordenes.service';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orden]), ClientesModule],
  controllers: [OrdenesController],
  providers: [OrdenesService],
  exports: [OrdenesService, TypeOrmModule],
})
export class OrdenesModule {}
