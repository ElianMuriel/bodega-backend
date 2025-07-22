import { Controller, Get, Post, Body } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() body: { action: string; user?: string; details?: string }) {
    return this.logsService.create(body);
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }
}
