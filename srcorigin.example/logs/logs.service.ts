import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './log.schema';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(data: Partial<Log>): Promise<Log> {
    const log = new this.logModel(data);
    return log.save();
  }

  async findAll(): Promise<Log[]> {
    return this.logModel.find().exec();
  }
}
