import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsString()
    @IsOptional() // si quieres que el rol por defecto sea 'cliente'
    role?: 'cliente' | 'vendedor' | 'admin';
}
