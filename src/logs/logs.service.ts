import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './log.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
  ) {}

  async create(action: string, description: string, userId: string) {
    const newLog = new this.logModel({ action, description, userId });
    return newLog.save();
  }

  async findAll() {
    return this.logModel.find().exec();
  }

  async findByUser(userId: string) {
    return this.logModel.find({ userId }).exec();
  }
}
