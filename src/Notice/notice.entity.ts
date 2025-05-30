// src/notices/entities/notice.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Notice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string; // Ejemplo: "Inventario bajo en Producto X"

    @Column({ type: 'text' })
    message: string; // Detalles de la alerta

    @Column({ default: false })
    isRead: boolean; // Para saber si la alerta fue leída

    @CreateDateColumn()
    createdAt: Date;
}
