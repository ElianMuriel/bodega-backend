import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './suppliers.entity';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class SuppliersService {
    constructor(
        @InjectRepository(Supplier)
        private suppliersRepository: Repository<Supplier>,
        private logsService: LogsService, 
    ) {}

    findAll(): Promise<Supplier[]> {
        return this.suppliersRepository.find();
    }

    async findOne(id: string): Promise<Supplier> {
        const supplier = await this.suppliersRepository.findOneBy({ id });
        if (!supplier) {
            throw new NotFoundException(`Proveedor con id ${id} no encontrado.`);
        }
        return supplier;
    }

    async create(data: Partial<Supplier>): Promise<Supplier> {
        const supplier = this.suppliersRepository.create(data);
        const saved = await this.suppliersRepository.save(supplier);

        await this.logsService.create(
            'created_supplier',
            `Se creó el proveedor ${saved.name}`,
            'admin',
        );

        return saved;
    }

    async update(id: string, data: Partial<Supplier>): Promise<Supplier> {
        await this.suppliersRepository.update(id, data);
        const updated = await this.findOne(id);

        await this.logsService.create(
            'updated_supplier',
            `Se actualizó el proveedor ${updated.name}`,
            'admin',
        );

        return updated;
    }

    async remove(id: string): Promise<void> {
        const supplier = await this.findOne(id);
        await this.suppliersRepository.delete(id);

        await this.logsService.create(
            'deleted_supplier',
            `Se eliminó el proveedor ${supplier.name}`,
            'admin',
        );
    }
}
