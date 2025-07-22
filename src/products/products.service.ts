import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { NotFoundException } from '@nestjs/common';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private logsService: LogsService,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado.`);
    }
    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(data);
    const saved = await this.productsRepository.save(product);
    await this.logsService.create(
      'created_product',
      `Se creó el producto ${saved.name}`,
      'admin',
    );

    return saved;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    await this.productsRepository.update(id, data);
    const updated = await this.findOne(id);
    await this.logsService.create(
      'updated_product',
      `Se actualizó el producto ${updated.name}`,
      'admin',
    );

    return updated;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.delete(id);
    await this.logsService.create(
      'deleted_product',
      `Se eliminó el producto ${product.name}`,
      'admin',
    );
  }
}
