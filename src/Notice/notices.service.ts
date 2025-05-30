import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Injectable()
export class NoticesService {
    constructor(
        @InjectRepository(Notice)
        private noticesRepository: Repository<Notice>,
    ) { }

    async findAll(): Promise<Notice[]> {
        return this.noticesRepository.find({ order: { createdAt: 'DESC' } });
    }

    async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
        const notice = this.noticesRepository.create(createNoticeDto);
        return this.noticesRepository.save(notice);
    }

    async markAsRead(id: number): Promise<void> {
        await this.noticesRepository.update(id, { isRead: true });
    }
}