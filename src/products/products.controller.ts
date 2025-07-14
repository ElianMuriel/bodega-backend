import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ConditionalUseGuards } from '../common/decorators/conditional-use-guards.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 👀 Público: listar productos
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  // 🔐 Protegido: crear producto (solo admins y vendedores)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vendedor')
  @Post()
  async create(@Body() createProductDto: any, @Req() req: any) {
    return this.productsService.create(createProductDto, req.user);
  }
}
