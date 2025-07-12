import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Controller('notices')
export class NoticesController {
    constructor(private readonly noticesService: NoticesService) { }

    @Get()
    findAll() {
        return this.noticesService.findAll();
    }

    @Post()
    create(@Body() createNoticeDto: CreateNoticeDto) {
        return this.noticesService.create(createNoticeDto);
    }

    @Patch(':id/read')
    markAsRead(@Param('id') id: string) {
        return this.noticesService.markAsRead(+id);
    }
}