import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async create(
    @Body() body: { action: string; description: string; userId: string }
  ) {
    return this.logsService.create(body.action, body.description, body.userId);
  }

  @Get()
  async findAll() {
    return this.logsService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.logsService.findByUser(userId);
  }
}
