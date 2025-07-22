import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private logsService: LogsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      username: createUserDto.username ?? createUserDto.email.split('@')[0] + Date.now(),
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role ?? 'cliente',
    });

    const saved = await this.userRepository.save(user);

    await this.logsService.create(
      'created_user',
      `Se creó el usuario ${saved.username} (${saved.email})`,
      'admin',
    );

    return saved;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    const updated = await this.userRepository.save(user);

    await this.logsService.create(
      'updated_user',
      `Se actualizó el usuario ${updated.username} (${updated.email})`,
      'admin',
    );

    return updated;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    await this.userRepository.remove(user);

    await this.logsService.create(
      'deleted_user',
      `Se eliminó el usuario ${user.username} (${user.email})`,
      'admin',
    );

    return;
  }
}
